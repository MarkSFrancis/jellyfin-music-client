import React from "react";
import { Provider } from "react-redux";
import { ChakraProvider } from "../components/Chakra/ChakraProvider";
import { PageMeta } from "../components/Meta/PageMeta";
import { PageTitle } from "../components/Meta/PageTitle";
import { PlayerBarContainer } from "../components/PlayerBar/PlayerBarContainer";
import { store } from "../store";
import { PlayerProvider } from "../utils/player";
import dynamic from "next/dynamic";

const ApiGuard = dynamic(
  () => import("../components/Jellyfin/ApiGuard").then((r) => r.ApiGuard),
  {
    ssr: false,
  }
);

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
