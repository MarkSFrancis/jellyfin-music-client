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
import { Track, useAddToUpNext } from "../../utils";

export interface TrackOptionsButton
  extends Omit<IconButtonProps, "aria-label"> {
  track: Track;
  "aria-label"?: string;
}

export const TrackOptionsButton = forwardRef<
  TrackOptionsButton,
  typeof IconButton
>(({ track, ...buttonProps }, ref) => {
  const addToUpNext = useAddToUpNext();

  const onPlayNext = useCallback(() => {
    addToUpNext(track);
  }, [addToUpNext, track]);

  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        ref={ref}
        variant="ghost"
        aria-label="View options"
        icon={<IconDots />}
        isRound
        {...buttonProps}
      />
      <MenuList>
        <MenuItem onClick={() => onPlayNext()}>Play next</MenuItem>
      </MenuList>
    </Menu>
  );
});
