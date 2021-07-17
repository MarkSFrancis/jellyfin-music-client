import {
  VStack,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { usePlayerCommands } from "../../../utils";
import { TrackDisplay } from "../../TrackDisplay";
import { useUpNext } from "./useUpNext";

const maxPreviousToShow = 10;
const maxNextToShow = 30;

export const UpNextTracks: FC = () => {
  const [previous, , next] = useUpNext();
  const { jumpToTrackInQueue } = usePlayerCommands();

  return (
    <>
      <DrawerCloseButton />
      <DrawerBody>
        <Tabs isFitted variant="enclosed">
          <TabList mr={8} mb="1em">
            <Tab isDisabled={next.length === 0}>Up next</Tab>
            <Tab isDisabled={previous.length === 0}>Previous</Tab>
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
                    onPlay={() => jumpToTrackInQueue(t)}
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
                      onPlay={() => jumpToTrackInQueue(t)}
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
