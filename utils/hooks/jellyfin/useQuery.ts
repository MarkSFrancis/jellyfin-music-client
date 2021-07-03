import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useApi } from "../../../components/Jellyfin";
import { ApiClient } from "../../jellyfinClient";
import { ApiParams, PickNever } from "../../types";
import { useSafeState } from "../useSafeState";
import { marshalRequestArgs, marshalResponse } from "./utils";

export interface QueryMetadata {
  refetch: () => void;
}

export interface QueryOptions {
  preserveDataOnRefetch?: boolean;
}

interface QueryBaseType<T> {
  data: T;
  response: AxiosResponse<T>;
  error: unknown;
}

export interface QuerySuccessState<T>
  extends PickNever<QueryBaseType<T>, "data" | "response"> {
  status: "success";
}

export interface QueryLoadingState<T>
  extends PickNever<QueryBaseType<T>, never> {
  status: "loading";
}

export interface QueryErrorState<T>
  extends PickNever<QueryBaseType<T>, "error"> {
  status: "error";
}

export type QueryState<T> =
  | QuerySuccessState<T>
  | QueryLoadingState<T>
  | QueryErrorState<T>;

export const useQuery = <
  T,
  ApiId extends keyof ApiClient,
  ApiMethod extends keyof ApiClient[ApiId]
>(
  apiId: ApiId,
  apiMethod: ApiMethod,
  params: ApiParams<ApiId, ApiMethod>,
  requestOptions?: Omit<AxiosRequestConfig, "cancelToken">,
  options?: QueryOptions
): [QueryState<T>, QueryMetadata] => {
  const [state, setState] = useSafeState<QueryState<T>>({ status: "loading" });
  const currentRequest = useRef<CancelTokenSource>();
  const { api } = useApi();

  const fetch = useCallback(() => {
    if (currentRequest.current) {
      currentRequest.current.cancel();
    }

    const source = axios.CancelToken.source();
    currentRequest.current = source;

    if (!options.preserveDataOnRefetch) {
      setState({
        status: "loading",
      });
    }

    const request = marshalRequestArgs<T, ApiId, ApiMethod>(
      apiId,
      apiMethod,
      params,
      requestOptions,
      source,
      api
    );

    marshalResponse(request, setState);
  }, [options, requestOptions, apiMethod, params, apiId, setState, api]);

  useEffect(() => {
    if (!currentRequest.current) {
      fetch();
    }

    return () => {
      if (currentRequest.current) {
        currentRequest.current.cancel();
      }
    };
  }, [fetch]);

  const meta: QueryMetadata = {
    refetch: fetch,
  };

  return [state, meta];
};
