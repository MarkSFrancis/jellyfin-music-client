import { Thead, Tr, Th } from '@chakra-ui/react';
import React, { FC } from 'react';
import { trackColumnWidths } from './trackCellWidths';

export const TrackHeadersDisplay: FC = () => {
  return (
    <Thead as="div">
      <Tr as="div">
        <Th as="div" width={trackColumnWidths[0]} display="inline-block"></Th>
        <Th as="div" width={trackColumnWidths[1]} display="inline-block">
          Name
        </Th>
        <Th as="div" width={trackColumnWidths[2]} display="inline-block">
          Artist
        </Th>
        <Th as="div" width={trackColumnWidths[3]} display="inline-block">
          Genre
        </Th>
        <Th as="div" width={trackColumnWidths[4]} display="inline-block"></Th>
      </Tr>
    </Thead>
  );
};
