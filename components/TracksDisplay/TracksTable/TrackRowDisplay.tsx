import React, { FC, useRef } from 'react';
import { TrackCellsDisplay } from './TrackCells';
import {
  TrackCellsContainer,
  TrackCellsContainerProps,
} from './TrackCells/TrackCellsContainer';

export interface TrackRowDisplayProps extends TrackCellsContainerProps {
  index: number;
}

export const TrackRowDisplay: FC<TrackRowDisplayProps> = ({
  index,
  ...trProps
}) => {
  const rowRef = useRef<HTMLElement>();

  return (
    <TrackCellsContainer {...trProps} ref={rowRef}>
      <TrackCellsDisplay
        key={trProps.track.Id}
        index={index}
        track={trProps.track}
        tracks={trProps.trackPlaylist}
        rowRef={rowRef}
      />
    </TrackCellsContainer>
  );
};
