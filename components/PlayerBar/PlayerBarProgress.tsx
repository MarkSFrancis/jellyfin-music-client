import { HStack, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { usePlayerAudio } from "../../utils";
import {
  getPlayerCurrentTrack,
  usePlayerSelector,
} from "../../utils/player/PlayerContext/playerSelectors";
import { PlayerSeek } from "./PlayerSeek";

export const PlayerBarProgress: FC = () => {
  const rawAudio = usePlayerAudio();
  const currentTrack = usePlayerSelector(getPlayerCurrentTrack);
  const [progressSeconds, setProgressSeconds] = useState<number | undefined>();
  const [durationSeconds, setDurationSeconds] = useState<number | undefined>(
    ticksToSeconds(currentTrack?.RunTimeTicks)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!rawAudio) {
        setProgressSeconds(undefined);
        return;
      }

      let seek = rawAudio.seek();
      if (isNaN(seek) || !isFinite(seek)) seek = undefined;
      setProgressSeconds(seek);
    }, 100);

    return () => clearInterval(interval);
  }, [rawAudio]);

  useEffect(() => {
    setDurationSeconds(ticksToSeconds(currentTrack?.RunTimeTicks));
  }, [currentTrack]);

  const durationDisplay =
    durationSeconds !== undefined && formatSeconds(durationSeconds);
  const progressDisplay =
    progressSeconds !== undefined && formatSeconds(progressSeconds);

  return (
    <HStack spacing={4} h="1.5em">
      {progressDisplay && <Text>{progressDisplay}</Text>}
      <PlayerSeek progress={progressSeconds} duration={durationSeconds} />
      {durationDisplay && <Text>{durationDisplay}</Text>}
    </HStack>
  );
};

const formatSeconds = (seconds: number) => {
  const ticksInMinutes = Math.floor(seconds / 60);
  const ticksInSeconds = Math.floor(seconds % 60);

  return `${ticksInMinutes.toString().padStart(2, "0")}:${ticksInSeconds
    .toString()
    .padStart(2, "0")}`;
};

const ticksToSeconds = (ticks: number) => {
  if (isNaN(ticks) || !isFinite(ticks)) return ticks;

  const ticksPerMillisecond = 10000;

  return ticks / ticksPerMillisecond / 1000;
};
