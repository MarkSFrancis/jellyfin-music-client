import { Td } from "@chakra-ui/react";
import React, { FC } from "react";
import {
  PlayerState,
  Track,
  useIsCurrentTrack,
  usePlayerState,
  usePlayTrack,
} from "../../../../utils";
import { TrackIndexPlayButton, TrackPlayButton } from "../../../TrackDisplay";
import { trackColumnWidths } from "../trackCellWidths";

export interface TrackPlayCellProps {
  track: Track;
  index: number;
  tracks: Track[];
}

export const TrackPlayCell: FC<TrackPlayCellProps> = ({
  track,
  tracks,
  index,
}) => {
  const { state } = usePlayerState();
  const playTrack = usePlayTrack();
  const isCurrentTrack = useIsCurrentTrack();
  const isPlaying = state === PlayerState.Playing;

  return (
    <Td
      as="div"
      border="none"
      width={trackColumnWidths[0]}
      display="inline-block"
    >
      <TrackIndexPlayButton
        isPlaying={isCurrentTrack(track) && isPlaying}
        isCurrentTrack={isCurrentTrack(track)}
        onClick={() => playTrack(track, tracks)}
        className="none-on-hover"
        index={index}
      />
      <TrackPlayButton
        isCurrentTrack={isCurrentTrack(track)}
        isPlaying={isCurrentTrack && isPlaying}
        onClick={() => playTrack(track, tracks)}
        className="display-on-hover"
      />
    </Td>
  );
};
