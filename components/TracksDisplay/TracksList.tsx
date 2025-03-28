import { Box } from '@chakra-ui/react';
import React, { CSSProperties, FC, MutableRefObject } from 'react';
import { useCallback } from 'react';
import {
  PlayerState,
  startNewQueue,
  togglePlayPause,
  Track,
  useIsCurrentTrack,
} from '../../utils';
import { TrackDisplay } from '../TrackDisplay/TrackDisplay';
import { List as FixedSizeList, WindowScroller } from 'react-virtualized';
import { usePlayerSelector } from '../../utils/player/PlayerContext/playerSelectors';
import { useAppDispatch } from '../../store';

export interface TracksListProps {
  tracks: Track[];
  scrollRef?: MutableRefObject<HTMLElement | null>;
}

export const TracksList: FC<TracksListProps> = ({ tracks, scrollRef }) => {
  const dispatch = useAppDispatch();
  const state = usePlayerSelector((state) => state.state);
  const isCurrentTrack = useIsCurrentTrack();

  const handlePlayPauseTrack = useCallback(
    (track: Track, isCurrentTrack: boolean) => {
      if (isCurrentTrack) {
        dispatch(togglePlayPause());
      } else {
        dispatch(startNewQueue({ newQueue: tracks, startTrack: track }));
      }
    },
    [tracks, dispatch]
  );

  const renderItem = useCallback(
    ({ index, style }: { index: number; style?: CSSProperties }) => {
      const t = tracks[index];

      return (
        <TrackDisplay
          key={t.Id}
          track={t}
          isCurrentTrack={isCurrentTrack(t)}
          isPlaying={isCurrentTrack(t) && state === PlayerState.Playing}
          onPlay={handlePlayPauseTrack}
          style={style}
        />
      );
    },
    [tracks, isCurrentTrack, handlePlayPauseTrack, state]
  );

  return (
    <Box height="100vh" width="100vw">
      <WindowScroller scrollElement={scrollRef?.current ?? undefined}>
        {({ height, width, isScrolling, onChildScroll, scrollTop }) => (
          <FixedSizeList
            autoHeight
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            scrollTop={scrollTop}
            width={width}
            rowCount={tracks.length}
            rowHeight={110}
            rowRenderer={renderItem}
          />
        )}
      </WindowScroller>
    </Box>
  );
};
