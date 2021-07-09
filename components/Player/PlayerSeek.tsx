import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { usePlayerAudio } from "../../utils";

export const PlayerSeek: FC = () => {
  const { rawAudio } = usePlayerAudio();
  const [progress, setProgress] = useState<number | undefined>();

  useEffect(() => {
    let currentFrameHandle: number;
    const frameHandler = () => {
      if (!rawAudio) {
        setProgress(undefined);
        return;
      }

      const currentTicks = rawAudio.seek() as number;
      setProgress(currentTicks);

      currentFrameHandle = requestAnimationFrame(frameHandler);
    };

    currentFrameHandle = requestAnimationFrame(frameHandler);

    return () => cancelAnimationFrame(currentFrameHandle);
  }, [rawAudio]);

  return (
    <Slider
      aria-label="Track progress"
      value={progress || 0}
      max={rawAudio?.duration() || 0}
      onChange={(seekTo) => rawAudio?.seek(seekTo)}
      isDisabled={!rawAudio}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      {rawAudio && <SliderThumb />}
    </Slider>
  );
};
