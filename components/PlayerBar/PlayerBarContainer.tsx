import { Box } from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import { PlayerBar } from "./PlayerBar";

export const PlayerBarContainer: FC = ({ children }) => {
  return (
    <Box h="100vh">
      <Box overflowY="auto" overflowX="auto">
        {children}
      </Box>
      <PlayerBar />
    </Box>
  );
};
