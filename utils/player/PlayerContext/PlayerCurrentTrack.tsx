import { FC } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Track } from "../../trackTypes";

export const playerCurrentTrackAtom = atom<Track | undefined>({
  key: "player-current-track",
  default: undefined,
});

export const usePlayerCurrentTrack = () =>
  useRecoilValue(playerCurrentTrackAtom);

export const useSetPlayerCurrentTrack = () =>
  useSetRecoilState(playerCurrentTrackAtom);

export const PlayerCurrentTrackProvider: FC = ({ children }) => {
  return <>{children}</>;
};
