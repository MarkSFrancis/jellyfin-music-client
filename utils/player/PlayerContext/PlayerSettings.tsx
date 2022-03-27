import { atom } from "recoil";

export const playerVolumeAtom = atom({
  key: "player-settings-volume",
  default: 100,
});

export const playerMutedAtom = atom({
  key: "player-settings-muted",
  default: false,
});

export const playerRepeatingAtom = atom({
  key: "player-settings-repeating",
  default: false,
});

export const playerShufflingAtom = atom({
  key: "player-settings-shuffling",
  default: false,
});
