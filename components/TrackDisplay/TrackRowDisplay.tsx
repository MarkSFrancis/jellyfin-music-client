import {
  useColorModeValue,
  IconButton,
  TableRowProps,
  Text,
  Tr,
  Td,
} from "@chakra-ui/react";
import { IconPlayerPause, IconPlayerPlay, IconDots } from "@tabler/icons";
import React, { FC, useMemo } from "react";
import { Track } from "../../utils";

interface TrackRowDisplayProps {
  track: Track;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  index: number;
}

export const TrackRowDisplay: FC<TrackRowDisplayProps> = ({
  track,
  isCurrentTrack,
  onPlay,
  index,
  isPlaying,
}) => {
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

  const trProps: TableRowProps = isCurrentTrack
    ? { background: playableTrackHover }
    : {
        onDoubleClick: onPlay,
        _hover: { background: playableTrackHover },
      };

  return (
    <Tr {...trProps} css={hoverCss}>
      <Td>
        <IconButton
          variant="ghost"
          isRound
          aria-label={isCurrentTrack ? "Play" : "Pause"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onPlay();
          }}
        >
          {isCurrentTrack && isPlaying ? (
            <IconPlayerPause />
          ) : (
            <>
              <IconPlayerPlay className="display-on-hover" />
              <Text className="none-on-hover">{index}</Text>
            </>
          )}
        </IconButton>
      </Td>
      <Td>{track.Name}</Td>
      <Td>{track.ArtistItems.map((a) => a.Name).join(", ")}</Td>
      <Td>{track.GenreItems.map((g) => g.Name).join(", ")}</Td>
      <Td>
        <IconButton
          className="visible-on-hover"
          variant="ghost"
          isRound
          aria-label="View options"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <IconDots />
        </IconButton>
      </Td>
    </Tr>
  );
};
