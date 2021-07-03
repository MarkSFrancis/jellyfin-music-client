import {
  Container,
  ContainerProps,
  forwardRef,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Logo } from "./Logo";

export const AuthContainer = forwardRef<ContainerProps, typeof Container>(
  (props, ref) => (
    <Container p={0} maxW="container.sm" ref={ref} {...props}>
      <VStack align="stretch" justifyContent="center" minH="100vh" spacing={4}>
        <Logo width="100px" height="100px" />
        {props.children}
      </VStack>
    </Container>
  )
);
