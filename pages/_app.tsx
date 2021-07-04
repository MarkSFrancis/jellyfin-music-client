import React from "react";
import { ChakraProvider } from "../components/Chakra";
import { ApiGuard } from "../components/Jellyfin";
import { PlayerProvider } from "../utils/player";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ApiGuard>
        <PlayerProvider>
          <Component {...pageProps} />
        </PlayerProvider>
      </ApiGuard>
    </ChakraProvider>
  );
}

export default MyApp;
