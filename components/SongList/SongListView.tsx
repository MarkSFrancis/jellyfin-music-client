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
import { IconDots, IconPlayerPlay } from "@tabler/icons";
import React, { FC } from "react";
import { useCallback } from "react";
import { Track, usePlayerCommands, usePlayerCurrentTrack } from "../../utils";

export interface SongListViewProps {
  tracks: Track[];
}

export const SongListView: FC<SongListViewProps> = ({ tracks }) => {
  const { track: playingTrack } = usePlayerCurrentTrack();
  const { startNewQueue } = usePlayerCommands();

  const handlePlayTrack = useCallback(
    (track: Track) => {
      startNewQueue(tracks, track);
    },
    [tracks, startNewQueue]
  );

  return (
    <Table variant="simple" size="sm" colorScheme="gray">
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Name</Th>
          <Th>Artist</Th>
          <Th>Genre</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tracks.map((t) => (
          <SongListEntry
            key={t.Id}
            track={t}
            isPlaying={t.Id === playingTrack?.Id}
            onPlay={() => handlePlayTrack(t)}
          />
        ))}
      </Tbody>
    </Table>
  );
};

interface SongListEntryProps {
  track: Track;
  isPlaying: boolean;
  onPlay: () => void;
}

const SongListEntry: FC<SongListEntryProps> = ({
  track,
  isPlaying,
  onPlay,
}) => {
  const playableTrackHover = useColorModeValue(
    "blackAlpha.300",
    "whiteAlpha.300"
  );

  const trProps: TableRowProps = isPlaying
    ? {}
    : {
        onClick: onPlay,
        cursor: "pointer",
        _hover: { background: playableTrackHover },
      };

  return (
    <Tr {...trProps}>
      <Td>
        <IconButton variant="ghost" isRound aria-label="View options">
          <IconDots />
        </IconButton>
      </Td>
      <Td>
        {isPlaying && (
          <Text as="span" mr={1}>
            <IconPlayerPlay display="inline-block" />
          </Text>
        )}
        {track.Name}
      </Td>
      <Td>{track.ArtistItems.map((a) => a.Name).join(", ")}</Td>
      <Td>{track.GenreItems.map((g) => g.Name).join(", ")}</Td>
    </Tr>
  );
};
