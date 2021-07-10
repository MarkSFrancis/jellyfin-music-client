import { HStack, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { usePlayerAudio } from "../../utils";
import { PlayerSeek } from "./PlayerSeek";

export const PlayerBarProgress: FC = () => {
  const { rawAudio } = usePlayerAudio();
  const [progress, setProgress] = useState<string | undefined>();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!rawAudio) {
        setProgress(undefined);
        return;
      }

      const currentTicks = formatTicks(rawAudio.seek() as number);
      setProgress(currentTicks);
    }, 100);

    return () => clearInterval(interval);
  }, [rawAudio]);

  const durationDisplay = rawAudio && formatTicks(rawAudio.duration());

  return (
    <HStack spacing={4} h="1.5em">
      {progress && <Text>{progress}</Text>}
      <PlayerSeek />
      {durationDisplay && <Text>{durationDisplay}</Text>}
    </HStack>
  );
};

const formatTicks = (ticks: number) => {
  const ticksInMinutes = Math.floor(ticks / 60);
  const ticksInSeconds = Math.floor(ticks % 60);

  return `${ticksInMinutes.toString().padStart(2, "0")}:${ticksInSeconds
    .toString()
    .padStart(2, "0")}`;
};
