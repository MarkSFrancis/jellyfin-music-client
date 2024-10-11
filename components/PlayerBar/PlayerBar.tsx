import {
  Box,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { PlayerBarProgress } from './PlayerBarProgress';
import { PlayerBarTrackDisplay } from './PlayerBarTrackDisplay';
import { PlayerButtons } from './PlayerButtons';
import { UpNext } from './UpNext';

export const PlayerBar: FC = () => {
  const playerTrackDisplay = useBreakpointValue({ base: 'none', md: 'block' });
  const playerProgressGrow = useBreakpointValue({ base: 1, md: 0 });
  const widths = useBreakpointValue<
    [string | undefined, string | undefined, string | undefined]
  >({
    base: [undefined, undefined, undefined],
    md: ['30%', '40%', '30%'],
  }) ?? [undefined, undefined, undefined];

  return (
    <Box
      p={4}
      borderTop="1px"
      borderColor="blue.700"
      backgroundColor="gray.900"
    >
      <Flex>
        <Box display={playerTrackDisplay} width={widths[0]} alignSelf="center">
          <PlayerBarTrackDisplay />
        </Box>
        <Flex
          flexGrow={playerProgressGrow}
          width={widths[1]}
          alignSelf="center"
          mx={4}
        >
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
          flexShrink={1}
          width={widths[2]}
          justifySelf="flex-end"
          alignSelf="center"
        >
          <Flex
            justifyContent="flex-end"
            color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
          >
            <UpNext />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
