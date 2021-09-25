import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { usePlayerAudio } from "../../utils";

export const PlayerSeek: FC = () => {
  const rawAudio = usePlayerAudio();
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const sliderRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const updateProgress = setInterval(() => {
      if (!rawAudio) {
        setProgress(undefined);
        return;
      }

      const currentTicks = rawAudio.seek();
      if (typeof currentTicks === "number") {
        setProgress(currentTicks);
      } else {
        setProgress(0);
      }
    }, 250);

    return () => clearInterval(updateProgress);
  }, [rawAudio]);

  useEffect(() => {
    if (!rawAudio) {
      setDuration(undefined);
      return;
    }

    const loadingAudio = rawAudio;

    const loadHandler = () => {
      setTimeout(() => {
        const duration = loadingAudio?.duration();
        setDuration(duration);
      }, 0);
    };

    if (loadingAudio.state() === "loading") {
      loadingAudio.once("load", loadHandler);

      return () => {
        loadingAudio.off("load", loadHandler);
      };
    } else {
      loadHandler();
    }
  }, [rawAudio]);

  return (
    <div ref={sliderRef} style={{ width: "100%" }}>
      <Slider
        aria-label="Track progress"
        value={progress || 0}
        min={0}
        max={duration || 1}
        onChange={(seekTo) => rawAudio?.seek(seekTo)}
        isDisabled={!rawAudio}
        focusThumbOnChange={false}
        verticalAlign="middle"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        {rawAudio && <SliderThumb />}
      </Slider>
    </div>
  );
};
