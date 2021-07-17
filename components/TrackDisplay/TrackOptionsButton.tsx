import {
  forwardRef,
  IconButton,
  IconButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IconDots } from "@tabler/icons";
import React, { useCallback } from "react";
import { Track, usePlayerCommands } from "../../utils";

export interface TrackOptionsButton
  extends Omit<IconButtonProps, "aria-label"> {
  track: Track;
  "aria-label"?: string;
}

export const TrackOptionsButton = forwardRef<
  TrackOptionsButton,
  typeof IconButton
>(({ track, ...buttonProps }, ref) => {
  const { addToUpNext } = usePlayerCommands();

  const onPlayNext = useCallback(() => {
    addToUpNext(track);
  }, [addToUpNext, track]);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        ref={ref}
        variant="ghost"
        aria-label="View options"
        icon={<IconDots />}
        {...buttonProps}
      />
      <MenuList>
        <MenuItem onClick={() => onPlayNext()}>Play next</MenuItem>
      </MenuList>
    </Menu>
  );
});
