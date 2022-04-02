import React from "react";
import { Provider } from "react-redux";
import { ChakraProvider } from "../components/Chakra";
import { ApiGuard } from "../components/Jellyfin";
import { PageMeta, PageTitle } from "../components/Meta";
import { PlayerBarContainer } from "../components/PlayerBar/PlayerBarContainer";
import { store } from "../store";
import { PlayerProvider } from "../utils/player";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider store={store}>
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
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
