import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  VStack,
  Divider,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useCallback } from "react";
import {
  PlayerState,
  Track,
  usePlayerCommands,
  usePlayerCurrentTrack,
  usePlayerState,
} from "../../utils";
import { TrackDisplay, TrackRowDisplay } from "../TrackDisplay";

export interface TracksDisplayProps {
  tracks: Track[];
  slimView?: boolean;
}

export const TracksDisplay: FC<TracksDisplayProps> = ({ tracks, slimView }) => {
  const { track: playingTrack } = usePlayerCurrentTrack();
  const { startNewQueue } = usePlayerCommands();
  const { state, togglePlayPause } = usePlayerState();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handlePlayPauseTrack = useCallback(
    (track: Track) => {
      if (playingTrack?.Id === track.Id) {
        togglePlayPause();
      } else {
        startNewQueue(tracks, track);
      }
    },
    [tracks, startNewQueue, togglePlayPause, playingTrack]
  );

  if (slimView || isMobile) {
    return (
      <VStack align="stretch" divider={<Divider />}>
        {tracks.map((t) => (
          <TrackDisplay
            key={t.Id}
            track={t}
            isCurrentTrack={t.Id === playingTrack?.Id}
            isPlaying={
              t.Id === playingTrack?.Id && state === PlayerState.Playing
            }
            onPlay={() => handlePlayPauseTrack(t)}
          />
        ))}
      </VStack>
    );
  }

  return (
    <Table key="table" variant="simple" size="sm" colorScheme="gray">
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Name</Th>
          <Th>Artist</Th>
          <Th>Genre</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tracks.map((t, i) => (
          <TrackRowDisplay
            key={t.Id}
            track={t}
            isCurrentTrack={t.Id === playingTrack?.Id}
            index={i + 1}
            isPlaying={
              t.Id === playingTrack?.Id && state === PlayerState.Playing
            }
            onPlay={() => handlePlayPauseTrack(t)}
          />
        ))}
      </Tbody>
    </Table>
  );
};
