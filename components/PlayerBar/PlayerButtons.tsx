import { ButtonGroup, IconButton, Tooltip } from "@chakra-ui/react";
import React, { FC } from "react";
import {
  pause,
  play,
  PlayerState,
  skipBackward1Track,
  skipForward1Track,
} from "../../utils";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from "@tabler/icons-react";
import { useAppDispatch } from "../../store";
import { usePlayerSelector } from "../../utils/player/PlayerContext/playerSelectors";

export const PlayerButtons: FC = () => {
  const dispatch = useAppDispatch();
  const state = usePlayerSelector((state) => state.state);

  return (
    <ButtonGroup alignSelf="center">
      <Tooltip label="Skip back">
        <IconButton
          isRound
          variant="ghost"
          isDisabled={state === PlayerState.Stopped}
          icon={<IconPlayerSkipBack />}
          aria-label="Skip back"
          onClick={() => dispatch(skipBackward1Track())}
        />
      </Tooltip>
      {state === PlayerState.Playing ? (
        <Tooltip label="Pause">
          <IconButton
            isRound
            icon={<IconPlayerPause />}
            aria-label="Pause"
            onClick={() => dispatch(pause())}
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
            onClick={() => dispatch(play())}
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
          onClick={() => dispatch(skipForward1Track())}
        />
      </Tooltip>
    </ButtonGroup>
  );
};
