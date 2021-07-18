import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React, { FC, MutableRefObject } from "react";
import { Track } from "../../utils";
import { TracksTable } from "./TracksTable";
import { TracksList } from "./TracksList";

export interface TracksDisplayProps {
  tracks: Track[];
  scrollRef?: MutableRefObject<HTMLElement>;
}

export const TracksDisplay: FC<TracksDisplayProps> = ({
  tracks,
  scrollRef,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile) {
    return <TracksList tracks={tracks} scrollRef={scrollRef} />;
  } else {
    return (
      <Flex flexDir="row" justifyContent="center">
        <TracksTable tracks={tracks} scrollRef={scrollRef} />
      </Flex>
    );
  }
};
