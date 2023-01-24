import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { IconPlaylist } from "@tabler/icons-react";
import React, { FC } from "react";
import { usePlayerSelector } from "../../../utils/player/PlayerContext/playerSelectors";
import { UpNextTracks } from "./UpNextTracks";

export const UpNext: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queue = usePlayerSelector((state) => state.queue);

  return (
    <>
      <Tooltip label="Up next">
        <IconButton
          variant="ghost"
          icon={<IconPlaylist />}
          aria-label="Up next"
          onClick={onOpen}
          isDisabled={!queue?.length}
        />
      </Tooltip>
      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        size="md"
        returnFocusOnClose={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <UpNextTracks />
        </DrawerContent>
      </Drawer>
    </>
  );
};
