import { FC } from "react";
import { usePlayerAudio } from "./PlayerAudio";
import { useEffect } from "react";
import { usePlayerCommands } from "./PlayerCommands";

export const PlayerPlayNext: FC = ({ children }) => {
  const { skipForward1Track } = usePlayerCommands();
  const { rawAudio } = usePlayerAudio();

  useEffect(() => {
    if (!rawAudio) return;

    const endHandler = () => {
      skipForward1Track();
    };

    rawAudio.on("end", endHandler);

    return () => {
      rawAudio.off("end", endHandler);
    };
  }, [skipForward1Track, rawAudio]);

  return <>{children}</>;
};
