import Head from 'next/head';
import React, { FC } from 'react';
import { usePageTitle } from './usePageTitle';

export interface PageTitleProps {
  children?: string[] | string;
}

export const PageTitle: FC<PageTitleProps> = (props) => {
  let breadcrumb: string[];
  if (!props.children) {
    breadcrumb = [];
  } else if (typeof props.children === 'string') {
    breadcrumb = [props.children];
  } else {
    breadcrumb = props.children;
  }

  return (
    <Head>
      <title>{usePageTitle(...breadcrumb)}</title>
    </Head>
  );
};
