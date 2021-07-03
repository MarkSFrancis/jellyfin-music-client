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

export interface MutationMetadata<
  ApiId extends keyof ApiClient,
  ApiMethod extends keyof ApiClient[ApiId]
> {
  mutate: (
    apiId: ApiId,
    apiMethod: ApiMethod,
    params: ApiParams<ApiId, ApiMethod>,
    requestOptions?: Omit<AxiosRequestConfig, "cancelToken">
  ) => void;
}

interface MutationStateBaseType<T> {
  data: T;
  response: AxiosResponse<T>;
  error: unknown;
}

export interface MutationIdleState<T>
  extends PickNever<MutationStateBaseType<T>, never> {
  status: "idle";
}

export interface MutationSuccessState<T>
  extends PickNever<MutationStateBaseType<T>, "data" | "response"> {
  status: "success";
}

export interface MutationLoadingState<T>
  extends PickNever<MutationStateBaseType<T>, never> {
  status: "loading";
}

export interface MutationErrorState<T>
  extends PickNever<MutationStateBaseType<T>, "error"> {
  status: "error";
}

export type MutationState<T> =
  | MutationIdleState<T>
  | MutationSuccessState<T>
  | MutationLoadingState<T>
  | MutationErrorState<T>;

export const useMutation = <
  T,
  ApiId extends keyof ApiClient,
  ApiMethod extends keyof ApiClient[ApiId]
>(): [MutationMetadata<ApiId, ApiMethod>, MutationState<T>] => {
  const [state, setState] = useSafeState<MutationState<T>>({
    status: "idle",
  });
  const currentRequest = useRef<CancelTokenSource>();
  const { api } = useApi();

  const fetch = useCallback(
    (
      apiId: ApiId,
      apiMethod: ApiMethod,
      params: ApiParams<ApiId, ApiMethod>,
      requestOptions?: Omit<AxiosRequestConfig, "cancelToken">
    ) => {
      if (currentRequest.current) {
        currentRequest.current.cancel();
      }

      const source = axios.CancelToken.source();
      currentRequest.current = source;

      setState({
        status: "loading",
      });

      const request = marshalRequestArgs<T, ApiId, ApiMethod>(
        apiId,
        apiMethod,
        params,
        requestOptions,
        source,
        api
      );

      marshalResponse(request, setState);
    },
    [setState, api]
  );

  useEffect(() => {
    return () => {
      if (currentRequest.current) {
        currentRequest.current.cancel();
      }
    };
  }, [fetch]);

  const meta: MutationMetadata<ApiId, ApiMethod> = {
    mutate: fetch,
  };

  return [meta, state];
};
