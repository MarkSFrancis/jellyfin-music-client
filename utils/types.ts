/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosError, AxiosResponse } from "axios";
import { ApiClient } from "./jellyfinClient";

/**
 * Picks certain properties from a type, but instead of removing other properties, it explicitly sets them to `never`
 */
export type PickNever<T, K extends keyof T> = Pick<T, K> & AsNever<Omit<T, K>>;

export type AsNever<T> = {
  [P in keyof T]?: never;
};

export type RemoveLast<T extends any[]> = Required<T> extends [
  ...infer R,
  infer _
]
  ? R
  : never;

export type ApiResult<
  ApiId extends keyof ApiClient,
  ApiMethod extends keyof ApiClient[ApiId]
> = ApiClient[ApiId][ApiMethod] extends (
  ...args: any[]
) => Promise<AxiosResponse<infer R>>
  ? R
  : never;

export type ApiParams<
  ApiId extends keyof ApiClient,
  ApiMethod extends keyof ApiClient[ApiId]
> = ApiClient[ApiId][ApiMethod] extends (...args: infer U) => any
  ? RemoveLast<U>
  : never;

export const isAxiosError = (err: unknown): err is AxiosError => {
  return (err as AxiosError).isAxiosError;
};
