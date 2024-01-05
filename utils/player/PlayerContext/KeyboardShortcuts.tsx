import React, { FC, PropsWithChildren } from "react";
import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import {
  skipBackward1Track,
  skipForward1Track,
  togglePlayPause,
} from "./playerSlice";

export const KeyboardShortcuts: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!shouldHandleKeyPress(e)) {
        return false;
      }
      if (e.key === " ") {
        e.preventDefault();

        dispatch(togglePlayPause());
      } else if (e.key === "ArrowRight") {
        e.preventDefault();

        dispatch(skipForward1Track());
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();

        dispatch(skipBackward1Track());
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
