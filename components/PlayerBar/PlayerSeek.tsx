import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React, { FC, WheelEvent } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { usePlayerAudio } from "../../utils";

export const PlayerSeek: FC = () => {
  const { rawAudio } = usePlayerAudio();
  const [progress, setProgress] = useState<number | undefined>();
  const queuedScroll = useRef(0);

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

  useEffect(() => {
    const updateSeek = setInterval(() => {
      if (queuedScroll.current !== 0) {
        rawAudio.seek((rawAudio.seek() as number) + queuedScroll.current);
        queuedScroll.current = 0;
      }
    }, 10);

    return () => clearInterval(updateSeek);
  });

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (!rawAudio) return;

      const scrollAmount = Math.floor((e.deltaX + e.deltaY) / 20);
      queuedScroll.current += scrollAmount;
    },
    [rawAudio]
  );

  return (
    <Slider
      aria-label="Track progress"
      value={progress || 0}
      max={rawAudio?.duration() || 1}
      onChange={(seekTo) => rawAudio?.seek(seekTo)}
      isDisabled={!rawAudio}
      onWheel={handleScroll}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      {rawAudio && <SliderThumb />}
    </Slider>
  );
};
