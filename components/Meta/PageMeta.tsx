import Head from "next/head";
import React, { FC } from "react";

export const PageMeta: FC = (props) => {
  return <Head>{props.children}</Head>;
};
