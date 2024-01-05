import React from "react";
import { Provider } from "react-redux";
import { ChakraProvider } from "../components/Chakra";
import { PageMeta, PageTitle } from "../components/Meta";
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
