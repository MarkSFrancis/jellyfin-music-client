import { Box } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { useRef } from "react";
import { FC } from "react";
import { PlayerBar } from "./PlayerBar";
import { PlayerBarProvider } from "./PlayerBarContext";

export const PlayerBarContainer: FC<PropsWithChildren> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>();
  console.info("Rendered playerbar container");

  return (
    <Box h="100vh">
      <PlayerBarProvider value={{ scrollRef: scrollContainerRef }}>
        <Box
          zIndex={0}
          position="fixed"
          w="100vw"
          top={0}
          bottom={105}
          overflowY="auto"
          overflowX="auto"
          ref={scrollContainerRef}
        >
          {children}
        </Box>
        <Box zIndex={1} position="fixed" bottom={0} w="100vw" height={105}>
          <PlayerBar />
        </Box>
      </PlayerBarProvider>
    </Box>
  );
};
