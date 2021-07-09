import { Button, ButtonGroup, VStack } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { Track } from "../utils";
import { usePlayerQueue, usePlayerCommands } from "../utils";

export default function Home() {
  const { queue } = usePlayerQueue();
  const { startNewQueue } = usePlayerCommands();

  const playExample = useCallback(() => {
    const defaultTrackId = `298332b3fa37fe629a3179b69594259a`;
    const defaultTrackContainer = "opus";

    if (queue.length > 0) {
      return;
    }

    startNewQueue([
      {
        Id: defaultTrackId,
        MediaSources: [
          {
            Id: defaultTrackId,
            Container: defaultTrackContainer,
          },
        ],
      } as Track,
    ]);
  }, [startNewQueue, queue]);

  return (
    <VStack spacing={4}>
      <ButtonGroup>
        <Button onClick={playExample}>Play example song</Button>
      </ButtonGroup>
    </VStack>
  );
}
