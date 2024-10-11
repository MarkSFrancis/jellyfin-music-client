import { Td } from '@chakra-ui/react';
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Track } from '../../../../utils';
import { TrackOptionsButton } from '../../../TrackDisplay/TrackOptionsButton';
import { trackColumnWidths } from '../trackCellWidths';

export interface TrackOptionsCellProps {
  rowRef?: MutableRefObject<HTMLElement>;
  track: Track;
}

export const TrackOptionsCell: FC<TrackOptionsCellProps> = ({
  track,
  rowRef,
}) => {
  const getIsHovered = useCallback(() => {
    if (!rowRef?.current) {
      return false;
    }
    return rowRef.current.querySelector(':hover');
  }, [rowRef]);

  const [isHovered, setIsHovered] = useState(getIsHovered);

  useEffect(() => {
    const interval = setInterval(() => {
      const isNowHovered = getIsHovered();
      if (isNowHovered !== isHovered) {
        setIsHovered(isNowHovered);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isHovered, getIsHovered]);

  return (
    <Td
      as="div"
      border="none"
      width={trackColumnWidths[4]}
      display="inline-block"
    >
      {isHovered ? <TrackOptionsButton track={track} /> : <></>}
    </Td>
  );
};
