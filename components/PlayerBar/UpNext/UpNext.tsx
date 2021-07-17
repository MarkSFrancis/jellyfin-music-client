import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { IconPlaylist } from "@tabler/icons";
import React, { FC } from "react";
import { usePlayerQueue } from "../../../utils";
import { UpNextTracks } from "./UpNextTracks";

export const UpNext: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { queue } = usePlayerQueue();

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
