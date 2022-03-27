import { Box } from "@chakra-ui/react";
import React, { FC, MutableRefObject } from "react";
import { useCallback } from "react";
import {
  PlayerState,
  Track,
  useIsCurrentTrack,
  usePlayerState,
  useStartNewQueue,
  useTogglePlayPause,
} from "../../utils";
import { TrackDisplay } from "../TrackDisplay";
import { List as FixedSizeList, WindowScroller } from "react-virtualized";

export interface TracksListProps {
  tracks: Track[];
  scrollRef?: MutableRefObject<HTMLElement>;
}

export const TracksList: FC<TracksListProps> = ({ tracks, scrollRef }) => {
  const startNewQueue = useStartNewQueue();
  const state = usePlayerState();
  const togglePlayPause = useTogglePlayPause();
  const isCurrentTrack = useIsCurrentTrack();

  const handlePlayPauseTrack = useCallback(
    (track: Track, isCurrentTrack: boolean) => {
      if (isCurrentTrack) {
        togglePlayPause();
      } else {
        startNewQueue(tracks, track);
      }
    },
    [tracks, startNewQueue, togglePlayPause]
  );

  const renderItem = useCallback(
    ({ index, style }) => {
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
      <WindowScroller scrollElement={scrollRef?.current}>
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
