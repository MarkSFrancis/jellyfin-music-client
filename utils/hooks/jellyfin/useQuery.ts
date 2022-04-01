import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useApi } from "../../../components/Jellyfin";
import { ApiClient } from "../../jellyfinClient";
import { ApiParams, ApiResult, PickNever } from "../../types";
import { useCache } from "../useCache";
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
  ApiId extends keyof ApiClient,
  ApiMethod extends keyof ApiClient[ApiId]
>(
  apiId: ApiId,
  apiMethod: ApiMethod,
  params: ApiParams<ApiId, ApiMethod>,
  requestOptions?: Omit<AxiosRequestConfig, "cancelToken">,
  options?: QueryOptions
): [QueryState<ApiResult<ApiId, ApiMethod>>, QueryMetadata] => {
  type T = ApiResult<ApiId, ApiMethod>;

  const [state, setState] = useSafeState<QueryState<T>>({ status: "loading" });
  const currentRequest = useRef<CancelTokenSource>();
  const api = useApi();
  const paramsCache = useCache(params);

  const fetch = useCallback(() => {
    if (currentRequest.current) {
      currentRequest.current.cancel();
    }

    const source = axios.CancelToken.source();
    currentRequest.current = source;

    if (!options?.preserveDataOnRefetch) {
      setState({
        status: "loading",
      });
    }

    const request = marshalRequestArgs<ApiId, ApiMethod>(
      apiId,
      apiMethod,
      paramsCache,
      requestOptions,
      source,
      api
    );

    marshalResponse<T>(request, setState);
  }, [options, requestOptions, apiMethod, paramsCache, apiId, setState, api]);

  useEffect(() => {
    if (!currentRequest.current) {
      fetch();
    }

    return () => {
      if (currentRequest.current) {
        currentRequest.current.cancel(
          "query parameters updated or component unmounted"
        );

        currentRequest.current = undefined;
      }
    };
  }, [fetch]);

  const meta: QueryMetadata = {
    refetch: fetch,
  };

  return [state, meta];
};
