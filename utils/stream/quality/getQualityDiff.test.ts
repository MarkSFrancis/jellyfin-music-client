import { expect, it } from "vitest";
import { getQualityDiff } from "./getQualityDiff";

it("should return 1 for original diff against medium", () => {
  const diff = getQualityDiff("ORIGINAL_QUALITY", "MEDIUM_QUALITY");

  expect(diff).toEqual(1);
});

it("should return -1 for low diff against medium", () => {
  const diff = getQualityDiff("LOW_QUALITY", "MEDIUM_QUALITY");

  expect(diff).toEqual(-1);
});

it("should return -1 for medium diff against high", () => {
  const diff = getQualityDiff("MEDIUM_QUALITY", "HIGH_QUALITY");

  expect(diff).toEqual(-1);
});

it("should return -1 for high diff against original", () => {
  const diff = getQualityDiff("HIGH_QUALITY", "ORIGINAL_QUALITY");

  expect(diff).toEqual(-1);
});

it("should return -1 for low diff against original", () => {
  const diff = getQualityDiff("LOW_QUALITY", "ORIGINAL_QUALITY");

  expect(diff).toEqual(-1);
});

it("should return 0 for medium diff against medium", () => {
  const diff = getQualityDiff("MEDIUM_QUALITY", "MEDIUM_QUALITY");

  expect(diff).toEqual(0);
});
