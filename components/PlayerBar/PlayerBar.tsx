import { Box, Flex, VStack } from "@chakra-ui/react";
import { IconPlaylist } from "@tabler/icons";
import React, { FC } from "react";
import { PlayerBarProgress } from "./PlayerBarProgress";
import { PlayerBarTrackDisplay } from "./PlayerBarTrackDisplay";
import { PlayerButtons } from "./PlayerButtons";

export const PlayerBar: FC = () => {
  return (
    <Box
      position="fixed"
      bottom={0}
      w="100vw"
      p={4}
      borderTop="1px"
      borderColor="blue.700"
      backgroundColor="whiteAlpha.100"
    >
      <Flex>
        <Box minWidth={180} width="30%" alignSelf="center">
          <PlayerBarTrackDisplay />
        </Box>
        <Flex maxW={720} width="40%" justifyContent="center" mx={4}>
          <VStack
            flexGrow={1}
            maxW={720}
            textAlign="center"
            align="stretch"
            spacing={2}
          >
            <PlayerBarProgress />
            <PlayerButtons />
          </VStack>
        </Flex>
        <Box
          minWidth={180}
          width="30%"
          justifySelf="flex-end"
          alignSelf="center"
        >
          <Flex justifyContent="flex-end">
            <IconPlaylist />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
