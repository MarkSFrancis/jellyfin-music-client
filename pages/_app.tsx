import React from "react";
import { ChakraProvider } from "../components/Chakra";
import { ApiGuard } from "../components/Jellyfin";
import { PlayerBar } from "../components/Player";
import { PlayerProvider } from "../utils/player";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ApiGuard>
        <PlayerProvider>
          <Component {...pageProps} />
          <PlayerBar />
        </PlayerProvider>
      </ApiGuard>
    </ChakraProvider>
  );
}

export default MyApp;
