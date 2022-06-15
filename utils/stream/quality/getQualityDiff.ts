import { QualityMode } from "./qualityMode";

/**
 * @param sourceQuality
 * @param targetQuality
 * @returns `-1` if the source is lower quality than the target, `0` if they are identical, and `1` if the source is higher quality than the target
 */
export const getQualityDiff = (
  sourceQuality: QualityMode,
  targetQuality: QualityMode
) => {
  const qualityValues: Record<QualityMode, number> = {
    LOW_QUALITY: 0,
    MEDIUM_QUALITY: 1,
    HIGH_QUALITY: 2,
    ORIGINAL_QUALITY: 3,
  };

  if (qualityValues[sourceQuality] === qualityValues[targetQuality]) {
    return 0;
  } else if (qualityValues[sourceQuality] > qualityValues[targetQuality]) {
    return 1;
  } else {
    return -1;
  }
};
