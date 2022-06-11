import { Track } from "../trackTypes";

// If loading a total of more than 10 items (including the current track), you'll need to increase the HTML Audio box limit (via howler configuration)
const LOOK_AHEAD_MAX = 2;
const LOOK_BEHIND_MAX = 1;

export const getPreloadTracks = ({
  repeating,
  currentTrackIndex,
  queue,
}: {
  repeating: boolean;
  currentTrackIndex: number;
  queue: Track[];
}) => {
  if (queue.length === 0) {
    return [];
  }

  if (currentTrackIndex < 0) {
    const nextTracks = getNextTracks(queue, -1, repeating);
    const previousTracks = getPreviousTracks(queue, 0, repeating);

    return uniqueTracks([...nextTracks, ...previousTracks]);
  }

  if (currentTrackIndex >= queue.length) {
    const nextTracks = getNextTracks(queue, queue.length, repeating);
    const previousTracks = getPreviousTracks(queue, queue.length, repeating);

    return uniqueTracks([...nextTracks, ...previousTracks]);
  }

  const currentTrack = queue[currentTrackIndex];
  const previousTracks = getPreviousTracks(queue, currentTrackIndex, repeating);
  const nextTracks = getNextTracks(queue, currentTrackIndex, repeating);

  return uniqueTracks([currentTrack, ...nextTracks, ...previousTracks]);
};

function getPreviousTracks(queue: Track[], index: number, loop: boolean) {
  const previousTracks: Track[] = [];
  for (let i = index - 1; previousTracks.length < LOOK_BEHIND_MAX; i--) {
    if (i < 0) {
      if (!loop) break;
      i = queue.length - 1;
    }

    previousTracks.push(queue[i]);
  }

  return previousTracks;
}

function getNextTracks(queue: Track[], index: number, loop: boolean) {
  const nextTracks: Track[] = [];
  for (let i = index + 1; nextTracks.length < LOOK_AHEAD_MAX; i++) {
    if (i >= queue.length) {
      if (!loop) break;
      i = 0;
    }

    nextTracks.push(queue[i]);
  }

  return nextTracks;
}

function uniqueTracks(tracks: Track[]) {
  return tracks.filter(
    (t, i) => tracks.findIndex((tr) => tr.Id === t.Id) === i
  );
}
