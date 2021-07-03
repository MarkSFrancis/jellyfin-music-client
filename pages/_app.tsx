import React from "react";
import { ChakraProvider } from "../components/Chakra";
import { ApiGuard } from "../components/Jellyfin";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ApiGuard>
        <Component {...pageProps} />
      </ApiGuard>
    </ChakraProvider>
  );
}

export default MyApp;
