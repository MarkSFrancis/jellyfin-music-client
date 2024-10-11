import { PlayerState } from '../../utils';
import {
  getPlayerCurrentTrack,
  usePlayerSelector,
} from '../../utils/player/PlayerContext/playerSelectors';

export const appName = 'Jellyfin Music';
const divider = '∙';

/**
 * Use a formatted page title - useful for <title> tags
 * @param breadcrumb The breadcrumb that leads to the current page
 */
export const usePageTitle = (...breadcrumb: string[]) => {
  const formattedPath = breadcrumb
    .filter((p) => p)
    .reverse()
    .join(` ${divider} `);

  const state = usePlayerSelector((state) => state.state);
  const track = usePlayerSelector(getPlayerCurrentTrack);

  if (!formattedPath) {
    if (track && state === PlayerState.Playing) {
      return `${track.Name} ${divider} ${track.ArtistItems?.map(
        (a) => a.Name
      ).join(', ')} ?? ''`;
    }

    return appName;
  }

  return formattedPath;
};
