import {
  VStack,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../../store';
import { play, setCurrentTrack, Track } from '../../../utils';
import { TrackDisplay } from '../../TrackDisplay/TrackDisplay';
import { LazyDisplay } from '../../TracksDisplay';
import { useUpNext } from './useUpNext';

const nextPageSize = 30;

export const UpNextTracks: FC = () => {
  const [, , next] = useUpNext();
  const dispatch = useAppDispatch();
  const [totalToShow, setTotalToShow] = useState(nextPageSize);
  const bodyRef = useRef<HTMLDivElement>(null);

  const onPlay = useCallback(
    (track: Track) => {
      dispatch(setCurrentTrack(track));
      dispatch(play());
      if (bodyRef.current) {
        bodyRef.current.scrollTo({
          top: 0,
        });
      }
    },
    [dispatch]
  );

  return (
    <>
      <DrawerHeader>Up next</DrawerHeader>
      <DrawerCloseButton />
      <DrawerBody ref={bodyRef}>
        <LazyDisplay
          loadedCount={totalToShow}
          totalItems={next.length}
          getPageStatus={'success'}
          onGetPage={() => setTotalToShow((t) => t + nextPageSize)}
          scrollRef={bodyRef}
        >
          <VStack key="up-next" align="stretch">
            {next.slice(0, totalToShow).map((t) => (
              <TrackDisplay
                key={t.Id}
                track={t}
                isCurrentTrack={false}
                isPlaying={false}
                onPlay={() => onPlay(t)}
              />
            ))}
          </VStack>
        </LazyDisplay>
      </DrawerBody>
    </>
  );
};
