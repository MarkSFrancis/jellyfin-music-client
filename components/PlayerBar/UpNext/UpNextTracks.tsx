import {
  VStack,
  Divider,
  Text,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useCallback } from "react";
import {
  PlayerState,
  Track,
  usePlayerCommands,
  usePlayerState,
} from "../../../utils";
import { TrackDisplay } from "../../TrackDisplay";
import { useUpNext } from "./useUpNext";

export interface UpNextTracksProps {
  currentTrackRef: React.MutableRefObject<HTMLButtonElement>;
}

const maxPreviousToShow = 10;
const maxNextToShow = 30;

export const UpNextTracks: FC<UpNextTracksProps> = ({ currentTrackRef }) => {
  const [previous, current, next] = useUpNext();
  const { jumpToTrackInQueue } = usePlayerCommands();
  const { state, togglePlayPause } = usePlayerState();

  const handlePlayPauseTrack = useCallback(
    (track: Track) => {
      if (current?.Id === track.Id) {
        togglePlayPause();
      } else {
        jumpToTrackInQueue(track);
      }
    },
    [jumpToTrackInQueue, togglePlayPause, current]
  );

  return (
    <>
      <DrawerCloseButton />
      <DrawerBody>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Up Next</Tab>
            <Tab>Previous</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack align="stretch" divider={<Divider />}>
                {next.slice(0, maxNextToShow).map((t) => (
                  <TrackDisplay
                    key={t.Id}
                    track={t}
                    isCurrentTrack={false}
                    isPlaying={false}
                    onPlay={() => handlePlayPauseTrack(t)}
                  />
                ))}
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack align="stretch" divider={<Divider />}>
                {previous
                  .slice(previous.length - maxPreviousToShow)
                  .map((t) => (
                    <TrackDisplay
                      key={t.Id}
                      track={t}
                      isCurrentTrack={false}
                      isPlaying={false}
                      onPlay={() => handlePlayPauseTrack(t)}
                    />
                  ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DrawerBody>
    </>
  );
};
