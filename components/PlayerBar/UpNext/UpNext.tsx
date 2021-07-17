import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { IconPlaylist } from "@tabler/icons";
import React, { FC } from "react";
import { useRef } from "react";
import { UpNextTracks } from "./UpNextTracks";

export const UpNext: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentTrackRef = useRef<HTMLButtonElement>();

  return (
    <>
      <Tooltip label="Up next">
        <IconButton
          variant="ghost"
          icon={<IconPlaylist />}
          aria-label="Up next"
          onClick={onOpen}
        />
      </Tooltip>
      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        size="md"
        initialFocusRef={currentTrackRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <UpNextTracks currentTrackRef={currentTrackRef} />
        </DrawerContent>
      </Drawer>
    </>
  );
};
