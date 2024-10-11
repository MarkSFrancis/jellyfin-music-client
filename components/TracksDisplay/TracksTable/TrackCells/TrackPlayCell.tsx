import { Td } from '@chakra-ui/react';
import React, { FC } from 'react';
import {
  PlayerState,
  Track,
  useIsCurrentTrack,
  usePlayTrack,
} from '../../../../utils';
import { usePlayerSelector } from '../../../../utils/player/PlayerContext/playerSelectors';
import {
  TrackIndexPlayButton,
  TrackPlayButton,
} from '../../../TrackDisplay/TrackPlayButton';
import { trackColumnWidths } from '../trackCellWidths';

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
  const state = usePlayerSelector((state) => state.state);
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
        isPlaying={isPlaying}
        onClick={() => playTrack(track, tracks)}
        className="display-on-hover"
      />
    </Td>
  );
};
