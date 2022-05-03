import Head from "next/head";
import React, { FC, PropsWithChildren } from "react";

export const PageMeta: FC<PropsWithChildren<unknown>> = (props) => {
  return <Head>{props.children}</Head>;
};
