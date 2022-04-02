import React from "react";
import { FC } from "react";
import { PlayerAudioProvider } from "./PlayerAudio";
import { MediaSessionManager } from "./MediaSessionManager";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export const PlayerProvider: FC = ({ children }) => {
  return (
    <PlayerAudioProvider>
      <MediaSessionManager>
        <KeyboardShortcuts>{children}</KeyboardShortcuts>
      </MediaSessionManager>
    </PlayerAudioProvider>
  );
};
