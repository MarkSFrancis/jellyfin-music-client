import { HStack, Box, VStack, forwardRef, StackProps } from "@chakra-ui/react";
import React from "react";
import { Track } from "../../utils";
import { SecondaryText } from "../Typography";
import { TrackOptionsButton } from "./TrackOptionsButton";
import { TrackPlayButton } from "./TrackPlayButton";

interface TrackDisplayProps extends StackProps {
  track: Track;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onPlay: () => void;
}

export const TrackDisplay = forwardRef<TrackDisplayProps, typeof HStack>(
  ({ track, isCurrentTrack, onPlay, isPlaying, ...stackProps }, ref) => {
    return (
      <HStack align="stretch" ref={ref} {...stackProps}>
        <VStack>
          <TrackPlayButton
            isCurrentTrack={isCurrentTrack}
            isPlaying={isPlaying}
            onClick={onPlay}
          />
          <TrackOptionsButton track={track} />
        </VStack>
        <VStack align="stretch">
          <Box>{track.Name}</Box>
          <Box>
            <SecondaryText>
              {track.ArtistItems.map((a) => a.Name).join(", ")}
            </SecondaryText>
          </Box>
          <Box>
            <SecondaryText>
              {track.GenreItems.map((g) => g.Name).join(", ")}
            </SecondaryText>
          </Box>
        </VStack>
      </HStack>
    );
  }
);
