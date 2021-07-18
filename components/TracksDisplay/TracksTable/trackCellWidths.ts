export const trackColumnWidths = [70, 300, 300, 300, 70] as const;
export const trackTableWidth = trackColumnWidths.reduce(
  (total, cur) => total + cur,
  0
);
