import React from "react";
import { FC } from "react";
import { PlayerCurrentTrackProvider } from "./PlayerCurrentTrack";
import { PlayerAudioProvider } from "./PlayerAudio";
import { PlayerQueueProvider } from "./PlayerQueue";
import { PlayerStateProvider } from "./PlayerState";
import { MediaSessionManager } from "./MediaSessionManager";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export const PlayerProvider: FC = ({ children }) => {
  return (
    <PlayerCurrentTrackProvider>
      <PlayerQueueProvider>
        <PlayerCurrentTrackProvider>
          <PlayerStateProvider>
            <PlayerAudioProvider>
              <MediaSessionManager>
                <KeyboardShortcuts>{children}</KeyboardShortcuts>
              </MediaSessionManager>
            </PlayerAudioProvider>
          </PlayerStateProvider>
        </PlayerCurrentTrackProvider>
      </PlayerQueueProvider>
    </PlayerCurrentTrackProvider>
  );
};
