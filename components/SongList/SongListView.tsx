import {
  IconButton,
  Table,
  TableRowProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconDots, IconPlayerPause, IconPlayerPlay } from "@tabler/icons";
import React, { FC } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import {
  PlayerState,
  Track,
  usePlayerCommands,
  usePlayerCurrentTrack,
  usePlayerState,
} from "../../utils";

export interface SongListViewProps {
  tracks: Track[];
}

export const SongListView: FC<SongListViewProps> = ({ tracks }) => {
  const { track: playingTrack } = usePlayerCurrentTrack();
  const { startNewQueue } = usePlayerCommands();
  const { state, setState } = usePlayerState();

  const handlePlayPauseTrack = useCallback(
    (track: Track) => {
      if (playingTrack?.Id === track.Id) {
        setState((s) => {
          if (s === PlayerState.Playing) {
            return PlayerState.Paused;
          } else if (s === PlayerState.Paused) {
            return PlayerState.Playing;
          } else {
            return s;
          }
        });
      } else {
        startNewQueue(tracks, track);
      }
    },
    [tracks, startNewQueue, setState, playingTrack]
  );

  return (
    <Table key="table" variant="simple" size="sm" colorScheme="gray">
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Name</Th>
          <Th>Artist</Th>
          <Th>Genre</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tracks.map((t, i) => (
          <SongListEntry
            key={t.Id}
            track={t}
            isCurrentTrack={t.Id === playingTrack?.Id}
            index={i + 1}
            isPlaying={
              t.Id === playingTrack?.Id && state === PlayerState.Playing
            }
            onPlay={() => handlePlayPauseTrack(t)}
          />
        ))}
      </Tbody>
    </Table>
  );
};

interface SongListEntryProps {
  track: Track;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  index: number;
}

const SongListEntry: FC<SongListEntryProps> = React.memo(
  ({ track, isCurrentTrack, onPlay, index, isPlaying }) => {
    const playableTrackHover = useColorModeValue(
      "blackAlpha.300",
      "whiteAlpha.300"
    );

    const trProps: TableRowProps = isCurrentTrack
      ? { background: playableTrackHover }
      : {
          onClick: onPlay,
          cursor: "pointer",
          _hover: { background: playableTrackHover },
        };

    const hoverCss = useMemo(() => {
      return [
        ":not(:hover) .visible-on-hover { visibility: hidden }",
        ":not(:hover) .display-on-hover { display: none }",
        ":hover .hidden-on-hover { display: none }",
        ":hover .none-on-hover { display: none }",
      ].join("\n");
    }, []);

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
  }
);
