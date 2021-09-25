import React, { FC } from "react";
import { useEffect } from "react";
import { usePlayerCommands } from "./PlayerCommands";
import { usePlayerState } from "./PlayerState";
import { PlayerState } from "./types";

export const KeyboardShortcuts: FC = ({ children }) => {
  const { skipBackward1Track, skipForward1Track } = usePlayerCommands();
  const { setState } = usePlayerState();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!shouldHandleKeyPress(e)) {
        return false;
      }
      if (e.key === " ") {
        e.preventDefault();

        setState((s) => {
          if (s === PlayerState.Paused) {
            return PlayerState.Playing;
          } else if (s === PlayerState.Playing) {
            return PlayerState.Paused;
          } else {
            return s;
          }
        });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();

        skipForward1Track();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();

        skipBackward1Track();
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  });

  return <>{children}</>;
};

const shouldHandleKeyPress = (e: KeyboardEvent) => {
  const nodeName = (e.target as HTMLElement)?.nodeName?.toUpperCase();

  switch (nodeName) {
    case "INPUT":
      return false;
    case "BUTTON":
      // Suppress only the space key for buttons
      return e.key !== " ";
    case "TEXTAREA":
      return false;
    default:
      return true;
  }
};
