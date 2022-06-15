import { MediaSource } from "../../trackTypes";
import { QualityMode } from "./qualityMode";

export const getAudioSrcQuality = (source: MediaSource): QualityMode => {
  if (source.Bitrate > 400) {
    return "ORIGINAL_QUALITY";
  } else if (source.Bitrate > 300) {
    return "HIGH_QUALITY";
  } else if (source.Bitrate > 200) {
    return "MEDIUM_QUALITY";
  } else {
    return "LOW_QUALITY";
  }
};
