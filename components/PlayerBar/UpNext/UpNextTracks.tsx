import {
  VStack,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Track, usePlayerCommands } from "../../../utils";
import { TrackDisplay } from "../../TrackDisplay";
import { LazyDisplay } from "../../TracksDisplay";
import { useUpNext } from "./useUpNext";

const nextPageSize = 30;

export const UpNextTracks: FC = () => {
  const [, , next] = useUpNext();
  const { jumpToTrackInQueue } = usePlayerCommands();
  const [totalToShow, setTotalToShow] = useState(nextPageSize);
  const bodyRef = useRef<HTMLDivElement>();

  const onPlay = useCallback(
    (track: Track) => {
      jumpToTrackInQueue(track);
      if (bodyRef.current) {
        bodyRef.current.scrollTo({
          top: 0,
        });
      }
    },
    [jumpToTrackInQueue]
  );

  return (
    <>
      <DrawerHeader>Up next</DrawerHeader>
      <DrawerCloseButton />
      <DrawerBody ref={bodyRef}>
        <LazyDisplay
          loadedCount={totalToShow}
          totalItems={next.length}
          getPageStatus={"success"}
          onGetPage={() => setTotalToShow((t) => t + nextPageSize)}
          scrollRef={bodyRef}
        >
          <VStack key="up-next" align="stretch" divider={<Divider />}>
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
