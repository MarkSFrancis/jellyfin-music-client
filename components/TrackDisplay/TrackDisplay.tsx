import {
  HStack,
  Box,
  IconButton,
  VStack,
  forwardRef,
  StackProps,
} from "@chakra-ui/react";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons";
import React from "react";
import { Track } from "../../utils";
import { SecondaryText } from "../Typography";

interface TrackDisplayProps extends StackProps {
  track: Track;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  playButtonRef?: React.MutableRefObject<HTMLButtonElement>;
}

export const TrackDisplay = forwardRef<TrackDisplayProps, typeof HStack>(
  (
    { track, isCurrentTrack, onPlay, isPlaying, playButtonRef, ...stackProps },
    ref
  ) => {
    return (
      <HStack align="stretch" ref={ref} {...stackProps}>
        <Box>
          <IconButton
            variant="ghost"
            isRound
            aria-label={isCurrentTrack ? "Play" : "Pause"}
            onClick={onPlay}
            ref={playButtonRef}
          >
            {isCurrentTrack && isPlaying ? (
              <IconPlayerPause />
            ) : (
              <IconPlayerPlay />
            )}
          </IconButton>
        </Box>
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
