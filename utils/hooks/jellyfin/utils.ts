import axios, {
  AxiosRequestConfig,
  CancelTokenSource,
  AxiosResponse,
} from "axios";
import { SetStateAction } from "react";
import { MutationState } from ".";
import { ApiClient } from "../../jellyfinClient";
import { ApiParams } from "../../types";

export const marshalRequestArgs = <
  T,
  ApiId extends keyof ApiClient,
  ApiMethod extends keyof ApiClient[ApiId]
>(
  apiId: ApiId,
  apiMethod: ApiMethod,
  params: ApiParams<ApiId, ApiMethod>,
  requestOptions: Omit<AxiosRequestConfig, "cancelToken">,
  cancellationSource: CancelTokenSource,
  api: ApiClient
) => {
  const reqOpts: AxiosRequestConfig = {
    ...(requestOptions ?? {}),
    cancelToken: cancellationSource.token,
  };

  const apiFunc = api[apiId][apiMethod] as unknown as (
    ...args: unknown[]
  ) => Promise<AxiosResponse<T>>;

  return apiFunc(...params, reqOpts);
};

export const marshalResponse = <T>(
  response: Promise<AxiosResponse>,
  setState: (value: SetStateAction<MutationState<T>>) => void
) => {
  response
    .then((res) => {
      setState({
        status: "success",
        data: res.data,
        response: res,
      });
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        return;
      }

      setState({
        status: "error",
        error: err,
      });
    });
};
