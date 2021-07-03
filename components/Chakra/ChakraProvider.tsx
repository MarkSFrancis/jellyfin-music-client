import {
  ChakraProvider as CoreChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import React, { FC } from "react";

export const ChakraProvider: FC = ({ children }) => {
  const theme = extendTheme(withDefaultColorScheme({ colorScheme: "blue" }), {
    config: {
      initialColorMode: "dark",
    },
  });

  return <CoreChakraProvider theme={theme}>{children}</CoreChakraProvider>;
};
