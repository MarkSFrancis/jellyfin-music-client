import {
  forwardRef,
  TableRowProps,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Track, useIsCurrentTrack, usePlayTrack } from "../../../../utils";

export interface TrackCellsContainerProps
  extends Omit<TableRowProps, "onPlay"> {
  trackPlaylist: Track[];
  track: Track;
}

export const TrackCellsContainer = forwardRef<
  TrackCellsContainerProps,
  typeof Tr
>(({ track, children, trackPlaylist, ...trProps }, ref) => {
  const isCurrentTrack = useIsCurrentTrack();
  const playTrack = usePlayTrack();

  const playableTrackHover = useColorModeValue(
    "blackAlpha.400",
    "whiteAlpha.400"
  );

  const playingTrackBackground = useColorModeValue(
    "blackAlpha.300",
    "whiteAlpha.300"
  );

  const hoverCss = useMemo(() => {
    return [
      ":not(:hover) .visible-on-hover { visibility: hidden }",
      ":not(:hover) .display-on-hover { display: none }",
      ":hover .hidden-on-hover { display: none }",
      ":hover .none-on-hover { display: none }",
    ].join("\n");
  }, []);

  const styleTrProps: TableRowProps = isCurrentTrack(track)
    ? {
        background: playingTrackBackground,
        _hover: { background: playableTrackHover },
      }
    : {
        onDoubleClick: () => playTrack(track, trackPlaylist),
        _hover: { background: playableTrackHover },
      };

  return (
    <Tr as="div" {...styleTrProps} css={hoverCss} ref={ref} {...trProps}>
      {children}
    </Tr>
  );
});
