import axios, {
  AxiosRequestConfig,
  CancelTokenSource,
  AxiosResponse,
} from "axios";
import { SetStateAction } from "react";
import { MutationState } from ".";
import { ApiClient } from "../../jellyfinClient";
import { ApiParams, ApiResult } from "../../types";

export const marshalRequestArgs = <
  ApiId extends keyof ApiClient,
  ApiMethod extends keyof ApiClient[ApiId]
>(
  apiId: ApiId,
  apiMethod: ApiMethod,
  params: ApiParams<ApiId, ApiMethod>,
  requestOptions: Omit<AxiosRequestConfig, "cancelToken">,
  cancellationSource: CancelTokenSource,
  api: ApiClient
): Promise<AxiosResponse<ApiResult<ApiId, ApiMethod>>> => {
  const reqOpts: AxiosRequestConfig = {
    ...(requestOptions ?? {}),
    cancelToken: cancellationSource.token,
  };

  const apiFunc = api[apiId][apiMethod] as unknown as (
    ...args: unknown[]
  ) => Promise<AxiosResponse<ApiResult<ApiId, ApiMethod>>>;

  return apiFunc.call(api[apiId], ...params, reqOpts);
};

export const marshalResponse = async <T>(
  response: Promise<AxiosResponse<T>>,
  setState: (value: SetStateAction<MutationState<T>>) => void
) => {
  try {
    const res = await response;
    setState({
      status: "success",
      data: res.data,
      response: res,
    });

    return res;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.error(err);
      return;
    }

    setState({
      status: "error",
      error: err,
    });
  }
};
