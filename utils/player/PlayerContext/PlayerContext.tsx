import React, { PropsWithChildren } from "react";
import { FC } from "react";
import { PlayerAudioProvider } from "./PlayerAudio";
import { MediaSessionManager } from "./MediaSessionManager";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export const PlayerProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <PlayerAudioProvider>
      <MediaSessionManager>
        <KeyboardShortcuts>{children}</KeyboardShortcuts>
      </MediaSessionManager>
    </PlayerAudioProvider>
  );
};
