import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useRef } from "react";
import { usePlayerAudio } from "../../utils";

export interface PlayerSeekProps {
  progress: number | undefined;
  duration: number | undefined;
}

export const PlayerSeek: FC<PlayerSeekProps> = ({ progress, duration }) => {
  const rawAudio = usePlayerAudio();
  const sliderRef = useRef<HTMLDivElement>();

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
