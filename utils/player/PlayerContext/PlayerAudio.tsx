import { FC, useEffect } from "react";
import { useAudio } from "../useAudio";
import { useAudioLoader } from "../useAudioLoader";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Howl } from "howler";

const playerAudioAtom = atom<Howl | undefined>({
  key: "player-audio",
  default: undefined,
  dangerouslyAllowMutability: true,
});

export const usePlayerAudio = () => useRecoilValue(playerAudioAtom);

export const PlayerAudioProvider: FC = ({ children }) => {
  const currentTracks = useAudioLoader();
  const audio = useAudio(currentTracks);
  const setAudio = useSetRecoilState(playerAudioAtom);

  useEffect(() => {
    setAudio(audio);
  }, [setAudio, audio]);

  return <>{children}</>;
};
