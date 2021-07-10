import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { IconPlayerPlay } from "@tabler/icons";
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
    <Table variant="simple">
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
  return (
    <Tr>
      <Td>
        <IconButton
          isRound
          isDisabled={isPlaying}
          aria-label="Play track"
          onClick={onPlay}
        >
          <IconPlayerPlay />
        </IconButton>
      </Td>
      <Td>{track.Name}</Td>
      <Td>{track.ArtistItems.map((a) => a.Name).join(", ")}</Td>
      <Td>{track.GenreItems.map((g) => g.Name).join(", ")}</Td>
    </Tr>
  );
};
