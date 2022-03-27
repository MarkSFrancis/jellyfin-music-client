import { ButtonGroup, IconButton, Tooltip } from "@chakra-ui/react";
import React, { FC } from "react";
import {
  PlayerState,
  useSkipForward1Track,
  useSkipBackward1Track,
} from "../../utils";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from "@tabler/icons";
import { usePlayerState, useSetPlayerState } from "../../utils";

export const PlayerButtons: FC = () => {
  const skipForward1Track = useSkipForward1Track();
  const skipBackward1Track = useSkipBackward1Track();
  const state = usePlayerState();
  const setState = useSetPlayerState();

  return (
    <ButtonGroup alignSelf="center">
      <Tooltip label="Skip back">
        <IconButton
          isRound
          variant="ghost"
          isDisabled={state === PlayerState.Stopped}
          icon={<IconPlayerSkipBack />}
          aria-label="Skip back"
          onClick={skipBackward1Track}
        />
      </Tooltip>
      {state === PlayerState.Playing ? (
        <Tooltip label="Pause">
          <IconButton
            isRound
            icon={<IconPlayerPause />}
            aria-label="Pause"
            onClick={() => setState(PlayerState.Paused)}
          />
        </Tooltip>
      ) : (
        <Tooltip label={state === PlayerState.Paused ? "Play" : ""}>
          <IconButton
            isRound
            isDisabled={
              state === PlayerState.Stopped || state === PlayerState.Loading
            }
            icon={<IconPlayerPlay />}
            aria-label="Play"
            onClick={() => setState(PlayerState.Playing)}
          />
        </Tooltip>
      )}
      <Tooltip label="Skip forward">
        <IconButton
          variant="ghost"
          isDisabled={state === PlayerState.Stopped}
          isRound
          icon={<IconPlayerSkipForward />}
          aria-label="Skip forward"
          onClick={skipForward1Track}
        />
      </Tooltip>
    </ButtonGroup>
  );
};
