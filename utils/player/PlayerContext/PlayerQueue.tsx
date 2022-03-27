import { FC } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Track } from "../../trackTypes";

export const playerQueueAtom = atom<Track[]>({
  key: "player-queue",
  default: [],
});

export const usePlayerQueue = () => useRecoilValue(playerQueueAtom);

export const useSetPlayerQueue = () => useSetRecoilState(playerQueueAtom);

export const PlayerQueueProvider: FC = ({ children }) => {
  return <>{children}</>;
};
