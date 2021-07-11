import React from "react";
import { FC } from "react";
import { PlayerCommandsProvider } from "./PlayerCommands";
import { PlayerCurrentTrackProvider } from "./PlayerCurrentTrack";
import { PlayerAudioProvider } from "./PlayerAudio";
import { PlayerQueueProvider } from "./PlayerQueue";
import { PlayerSettingsProvider } from "./PlayerSettings";
import { PlayerStateProvider } from "./PlayerState";
import { PlayerPlayNext } from "./PlayerPlayNext";
import { MediaSessionManager } from "./MediaSessionManager";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export const PlayerProvider: FC = ({ children }) => {
  return (
    <PlayerSettingsProvider>
      <PlayerCurrentTrackProvider>
        <PlayerQueueProvider>
          <PlayerCurrentTrackProvider>
            <PlayerStateProvider>
              <PlayerCommandsProvider>
                <PlayerAudioProvider>
                  <PlayerPlayNext>
                    <MediaSessionManager>
                      <KeyboardShortcuts>{children}</KeyboardShortcuts>
                    </MediaSessionManager>
                  </PlayerPlayNext>
                </PlayerAudioProvider>
              </PlayerCommandsProvider>
            </PlayerStateProvider>
          </PlayerCurrentTrackProvider>
        </PlayerQueueProvider>
      </PlayerCurrentTrackProvider>
    </PlayerSettingsProvider>
  );
};
