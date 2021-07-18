import { Td } from "@chakra-ui/react";
import React, { FC } from "react";
import { Track } from "../../../../utils";
import { TrackOptionsButton } from "../../../TrackDisplay";
import { trackColumnWidths } from "../trackCellWidths";

export interface TrackOptionsCellProps {
  track: Track;
}

export const TrackOptionsCell: FC<TrackOptionsCellProps> = ({ track }) => {
  return (
    <Td as="div" width={trackColumnWidths[4]} display="inline-block">
      <TrackOptionsButton track={track} className="visible-on-hover" />
    </Td>
  );
};
