import React from "react";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "../components/Chakra";
import { ApiGuard } from "../components/Jellyfin";
import { PageMeta, PageTitle } from "../components/Meta";
import { PlayerBarContainer } from "../components/PlayerBar/PlayerBarContainer";
import { PlayerProvider } from "../utils/player";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <PageMeta>
          <link rel="shortcut icon" href="/favicon.ico" />
        </PageMeta>
        <ApiGuard>
          <PlayerProvider>
            <PageTitle />
            <PlayerBarContainer>
              <Component {...pageProps} />
            </PlayerBarContainer>
          </PlayerProvider>
        </ApiGuard>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
