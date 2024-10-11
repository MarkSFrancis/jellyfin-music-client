import {
  ChakraProvider as CoreChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import React, { FC, PropsWithChildren } from 'react';

export const ChakraProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = extendTheme(withDefaultColorScheme({ colorScheme: 'blue' }), {
    config: {
      initialColorMode: 'dark',
    },
  });

  return <CoreChakraProvider theme={theme}>{children}</CoreChakraProvider>;
};
