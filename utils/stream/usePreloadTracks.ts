import { useMemo } from 'react';
import { Track } from '../trackTypes';
import { usePlayerSelector } from '../player/PlayerContext/playerSelectors';
import { getPreloadTracks } from './trackPreloader';

export const usePreloadTracks = () => {
  const repeating = usePlayerSelector((state) => state.settings.repeating);
  const currentTrackIndex = usePlayerSelector(
    (state) => state.currentTrackIndex
  );
  const queue = usePlayerSelector((state) => state.queue);

  const tracksToLoad = useMemo(
    (): Track[] => getPreloadTracks({ repeating, currentTrackIndex, queue }),
    [queue, currentTrackIndex, repeating]
  );

  return tracksToLoad;
};
