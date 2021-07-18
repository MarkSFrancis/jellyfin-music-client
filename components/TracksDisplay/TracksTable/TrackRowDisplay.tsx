import { useColorModeValue, TableRowProps, Tr } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import { Track, useIsCurrentTrack, usePlayTrack } from "../../../utils";

interface TrackRowDisplayProps extends Omit<TableRowProps, "onPlay"> {
  trackPlaylist: Track[];
  track: Track;
}

export const TrackRowDisplay: FC<TrackRowDisplayProps> = ({
  track,
  children,
  trackPlaylist,
  ...trProps
}) => {
  const isCurrentTrack = useIsCurrentTrack();
  const playTrack = usePlayTrack();

  const playableTrackHover = useColorModeValue(
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
    ? { background: playableTrackHover }
    : {
        onDoubleClick: () => playTrack(track, trackPlaylist),
        _hover: { background: playableTrackHover },
      };

  return (
    <Tr {...styleTrProps} css={hoverCss} {...trProps}>
      {children}
    </Tr>
  );
};
