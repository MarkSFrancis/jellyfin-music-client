import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { useCallback, useRef } from "react";
import { useApi } from "../../../components/Jellyfin/useApi";
import { ApiClient } from "../../jellyfinClient";
import { ApiParams, ApiResult, PickNever } from "../../types";
import { useSafeState } from "../useSafeState";
import { marshalRequestArgs, marshalResponse } from "./utils";

export type MutateRequest<
  ApiId extends keyof ApiClient,
  ApiMethod extends keyof ApiClient[ApiId],
> = (
  params: ApiParams<ApiId, ApiMethod>,
  requestOptions?: Omit<AxiosRequestConfig, "cancelToken">
) => Promise<AxiosResponse<ApiResult<ApiId, ApiMethod>>>;

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
  ApiId extends keyof ApiClient,
  ApiMethod extends keyof ApiClient[ApiId],
>(
  apiId: ApiId,
  apiMethod: ApiMethod
): [
  MutateRequest<ApiId, ApiMethod>,
  MutationState<ApiResult<ApiId, ApiMethod>>,
] => {
  const [state, setState] = useSafeState<
    MutationState<ApiResult<ApiId, ApiMethod>>
  >({
    status: "idle",
  });
  const currentRequest = useRef<CancelTokenSource>();
  const api = useApi();

  const fetch: MutateRequest<ApiId, ApiMethod> = useCallback(
    async (params, requestOptions) => {
      if (currentRequest.current) {
        currentRequest.current.cancel();
      }

      const source = axios.CancelToken.source();
      currentRequest.current = source;

      setState({
        status: "loading",
      });

      const request = marshalRequestArgs<ApiId, ApiMethod>(
        apiId,
        apiMethod,
        params,
        requestOptions,
        source,
        api
      );

      const response = await marshalResponse(request, setState);
      return response;
    },
    [setState, api, apiId, apiMethod]
  );

  return [fetch, state];
};
