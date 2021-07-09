import { ButtonGroup, Button, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { PlayerState, usePlayerState } from "../../utils";
import { PlayerSeek } from "./PlayerSeek";

export const PlayerBar: FC = () => {
  const { state, setState } = usePlayerState();
  return (
    <Box>
      <PlayerSeek />
      <ButtonGroup>
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
    </Box>
  );
};
