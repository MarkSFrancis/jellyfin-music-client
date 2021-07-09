import React from "react";
import { FC } from "react";
import { PlayerCommandsProvider } from "./PlayerCommands";
import { PlayerCurrentTrackProvider } from "./PlayerCurrentTrack";
import { PlayerAudioProvider } from "./PlayerAudio";
import { PlayerQueueProvider } from "./PlayerQueue";
import { PlayerSettingsProvider } from "./PlayerSettings";
import { PlayerStateProvider } from "./PlayerState";
import { PlayerPlayNext } from "./PlayerPlayNext";

export const PlayerProvider: FC = ({ children }) => {
  return (
    <PlayerSettingsProvider>
      <PlayerCurrentTrackProvider>
        <PlayerQueueProvider>
          <PlayerCurrentTrackProvider>
            <PlayerStateProvider>
              <PlayerCommandsProvider>
                <PlayerAudioProvider>
                  <PlayerPlayNext>{children}</PlayerPlayNext>
                </PlayerAudioProvider>
              </PlayerCommandsProvider>
            </PlayerStateProvider>
          </PlayerCurrentTrackProvider>
        </PlayerQueueProvider>
      </PlayerCurrentTrackProvider>
    </PlayerSettingsProvider>
  );
};
