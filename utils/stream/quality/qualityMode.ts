export type QualityMode =
  | "LOW_QUALITY"
  | "MEDIUM_QUALITY"
  | "HIGH_QUALITY"
  | "ORIGINAL_QUALITY";

// TODO migrate to some local settings so that the user can configure this
export const DEFAULT_QUALITY_MODE: QualityMode = "LOW_QUALITY";
