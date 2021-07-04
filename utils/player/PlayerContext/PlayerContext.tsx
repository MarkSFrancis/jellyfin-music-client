import React from "react";
import { FC } from "react";
import { PlayerCommandsProvider } from "./PlayerCommands";
import { PlayerCurrentTrackProvider } from "./PlayerCurrentTrack";
import { PlayerProgressProvider } from "./PlayerProgress";
import { PlayerQueueProvider } from "./PlayerQueue";
import { PlayerSettingsProvider } from "./PlayerSettings";
import { PlayerStateProvider } from "./PlayerState";

export const PlayerProvider: FC = ({ children }) => {
  return (
    <PlayerSettingsProvider>
      <PlayerProgressProvider>
        <PlayerCurrentTrackProvider>
          <PlayerQueueProvider>
            <PlayerCurrentTrackProvider>
              <PlayerStateProvider>
                <PlayerCommandsProvider>{children}</PlayerCommandsProvider>
              </PlayerStateProvider>
            </PlayerCurrentTrackProvider>
          </PlayerQueueProvider>
        </PlayerCurrentTrackProvider>
      </PlayerProgressProvider>
    </PlayerSettingsProvider>
  );
};
