import { Td } from "@chakra-ui/react";
import React, { FC, MutableRefObject } from "react";
import { Track } from "../../../../utils";
import { trackColumnWidths } from "../trackCellWidths";
import { TrackOptionsCell } from "./TrackOptionsCell";
import { TrackPlayCell } from "./TrackPlayCell";

export interface TrackCellsDisplayProps {
  tracks: Track[];
  track: Track;
  index: number;
  rowRef: MutableRefObject<HTMLElement>;
}

export const TrackCellsDisplay: FC<TrackCellsDisplayProps> = (props) => {
  return (
    <>
      <TrackPlayCell
        index={props.index}
        track={props.track}
        tracks={props.tracks}
      />
      <Td
        as="div"
        width={trackColumnWidths[1]}
        display="inline-block"
        border="none"
      >
        {props.track.Name}
      </Td>
      <Td
        as="div"
        width={trackColumnWidths[2]}
        display="inline-block"
        border="none"
      >
        {props.track.ArtistItems?.map((a) => a.Name).join(", ")}
      </Td>
      <Td
        as="div"
        width={trackColumnWidths[3]}
        display="inline-block"
        border="none"
      >
        {props.track.GenreItems?.map((a) => a.Name).join(", ")}
      </Td>
      <TrackOptionsCell track={props.track} rowRef={props.rowRef} />
    </>
  );
};
