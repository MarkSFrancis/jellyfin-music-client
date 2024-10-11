import { Container, ContainerProps, forwardRef } from '@chakra-ui/react';
import React from 'react';

export const PageContainer = forwardRef<ContainerProps, typeof Container>(
  (props, ref) => <Container p={4} maxW="container.xl" ref={ref} {...props} />
);
