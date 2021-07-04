import { useTrack } from "../../utils/player/useTrack";
import React, { FC } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useTracks } from "../../utils/player";
import { usePlayerCommands } from "../../utils/player/PlayerContext/PlayerCommands";
import { Track } from "../../utils";
import { usePlayerState } from "../../utils/player/PlayerContext/PlayerState";
import { PlayerState } from "../../utils/player/PlayerContext";
import { useCallback } from "react";

export const TrackPlayer: FC = () => {
  const { startNewQueue } = usePlayerCommands();
  const { state, setState } = usePlayerState();
  const currentTracks = useTracks();
  useTrack(currentTracks);

  const startPlaylist = useCallback(() => {
    const defaultTrackId = `298332b3fa37fe629a3179b69594259a`;
    const defaultTrackContainer = "opus";

    if (currentTracks.length > 0) {
      return;
    }

    startNewQueue([
      {
        Id: defaultTrackId,
        MediaSources: [
          {
            Id: defaultTrackId,
            Container: defaultTrackContainer,
          },
        ],
      } as Track,
    ]);
  }, [startNewQueue, currentTracks]);

  return (
    <>
      <ButtonGroup>
        <Button onClick={startPlaylist}>Start playlist</Button>
        <Button
          onClick={() =>
            setState((p) =>
              p === PlayerState.Playing
                ? PlayerState.Paused
                : PlayerState.Playing
            )
          }
        >
          {state}
        </Button>
      </ButtonGroup>
    </>
  );
};
