import { IconButton, IconButtonProps, forwardRef } from "@chakra-ui/react";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons";
import React from "react";

export interface TrackPlayButtonProps
  extends Omit<IconButtonProps, "aria-label"> {
  isCurrentTrack: boolean;
  isPlaying: boolean;
  "aria-label"?: string;
}

export const TrackPlayButton = forwardRef<
  TrackPlayButtonProps,
  typeof IconButton
>(({ isCurrentTrack, isPlaying, ...buttonProps }, ref) => {
  return (
    <IconButton
      ref={ref}
      variant="ghost"
      isRound
      aria-label={isCurrentTrack ? "Play" : "Pause"}
      icon={
        isCurrentTrack && isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />
      }
      {...buttonProps}
    />
  );
});
