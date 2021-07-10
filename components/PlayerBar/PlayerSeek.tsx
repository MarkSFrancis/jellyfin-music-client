import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { usePlayerAudio } from "../../utils";

export const PlayerSeek: FC = () => {
  const { rawAudio } = usePlayerAudio();
  const [progress, setProgress] = useState<number | undefined>();
  const [duration, setDuration] = useState<number>(1);
  const queuedScroll = useRef(0);
  const sliderRef = useRef<HTMLDivElement>();

  useEffect(() => {
    let currentFrameHandle: number;
    const frameHandler = () => {
      if (!rawAudio) {
        setProgress(undefined);
        return;
      }

      const currentTicks = rawAudio.seek() as number;
      setProgress(currentTicks);
      setDuration(rawAudio.duration());

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
      e.preventDefault();
      if (!rawAudio) return;

      const scrollAmount = Math.floor((e.deltaX + e.deltaY) / 20);
      queuedScroll.current += scrollAmount;
    },
    [rawAudio]
  );

  useEffect(() => {
    const slider = sliderRef.current;
    console.log("Attaching listener", slider);
    slider.addEventListener("wheel", handleScroll, { passive: false });

    return () => slider.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  return (
    <div ref={sliderRef} style={{ width: "100%" }}>
      <Slider
        aria-label="Track progress"
        value={progress || 0}
        max={duration}
        onChange={(seekTo) => rawAudio?.seek(seekTo)}
        isDisabled={!rawAudio}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        {rawAudio && <SliderThumb />}
      </Slider>
    </div>
  );
};
