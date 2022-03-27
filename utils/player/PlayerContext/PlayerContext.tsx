import React from "react";
import { FC } from "react";
import { PlayerAudioProvider } from "./PlayerAudio";
import { PlayerQueueProvider } from "./PlayerQueue";
import { PlayerStateProvider } from "./PlayerState";
import { MediaSessionManager } from "./MediaSessionManager";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export const PlayerProvider: FC = ({ children }) => {
  return (
    <PlayerQueueProvider>
      <PlayerStateProvider>
        <PlayerAudioProvider>
          <MediaSessionManager>
            <KeyboardShortcuts>{children}</KeyboardShortcuts>
          </MediaSessionManager>
        </PlayerAudioProvider>
      </PlayerStateProvider>
    </PlayerQueueProvider>
  );
};
