import { Table, Tbody } from '@chakra-ui/react';
import React, { CSSProperties, FC, MutableRefObject } from 'react';
import { Track } from '../../../utils';
import { TrackHeadersDisplay, trackTableWidth } from './TrackCells';
import { TrackRowDisplay } from './TrackRowDisplay';
import { List as FixedSizeList, WindowScroller } from 'react-virtualized';

export interface TracksTableProps {
  tracks: Track[];
  scrollRef?: MutableRefObject<HTMLElement | null>;
}

export const TracksTable: FC<TracksTableProps> = ({ tracks, scrollRef }) => {
  const RenderRow = React.useCallback(
    ({ index, style }: { index: number; style?: CSSProperties }) => {
      const track = tracks[index];

      return (
        <TrackRowDisplay
          style={style}
          trackPlaylist={tracks}
          track={track}
          index={index}
        />
      );
    },
    [tracks]
  );

  return (
    <Table
      as="div"
      variant="simple"
      size="sm"
      colorScheme="gray"
      css={{ display: 'inline-block', borderSpacing: 0 }}
      width={trackTableWidth}
    >
      <div>
        <TrackHeadersDisplay />
      </div>
      <Tbody as="div">
        <WindowScroller scrollElement={scrollRef?.current ?? undefined}>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <FixedSizeList
              autoHeight
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              width={trackTableWidth}
              rowCount={tracks.length}
              rowHeight={57}
              rowRenderer={RenderRow}
            />
          )}
        </WindowScroller>
      </Tbody>
    </Table>
  );
};
