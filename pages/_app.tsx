import React from "react";
import { ChakraProvider } from "../components/Chakra";
import { ApiGuard } from "../components/Jellyfin";
import { PlayerBarContainer } from "../components/PlayerBar/PlayerBarContainer";
import { PlayerProvider } from "../utils/player";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ApiGuard>
        <PlayerProvider>
          <PlayerBarContainer>
            <Component {...pageProps} />
          </PlayerBarContainer>
        </PlayerProvider>
      </ApiGuard>
    </ChakraProvider>
  );
}

export default MyApp;
