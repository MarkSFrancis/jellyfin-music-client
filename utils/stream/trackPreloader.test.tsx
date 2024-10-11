import { expect, it } from 'vitest';
import { Track } from '../trackTypes';
import { getPreloadTracks } from './trackPreloader';

const makeQueue = (length = 1) => {
  const tracks: Track[] = [];
  for (let i = 0; i < length; i++) {
    tracks.push({ Id: i.toString() } as Track);
  }

  return tracks;
};

it('should request no tracks if the queue is empty', () => {
  const tracks = getPreloadTracks({
    repeating: false,
    currentTrackIndex: -1,
    queue: makeQueue(0),
  });

  expect(tracks).toHaveLength(0);
});

it('should request only the last track if the queue is ended and not repeating', () => {
  const tracks = getPreloadTracks({
    repeating: false,
    currentTrackIndex: 1,
    queue: makeQueue(1),
  });

  expect(tracks).toHaveLength(1);
});

it('should request the last track and first two tracks if the queue is ended and repeating', () => {
  const tracks = getPreloadTracks({
    repeating: true,
    currentTrackIndex: 5,
    queue: makeQueue(5),
  });

  expect(tracks).toHaveLength(3);
  expect(tracks[0].Id).toBe('0');
  expect(tracks[1].Id).toBe('1');
  expect(tracks[2].Id).toBe('4');
});

it('should request the current track and next two tracks if the queue is started and not repeating', () => {
  const tracks = getPreloadTracks({
    repeating: false,
    currentTrackIndex: 0,
    queue: makeQueue(5),
  });

  expect(tracks).toHaveLength(3);
  expect(tracks[0].Id).toBe('0');
  expect(tracks[1].Id).toBe('1');
  expect(tracks[2].Id).toBe('2');
});

it('should request the current track, next two tracks, and last track if the queue is started and repeating', () => {
  const tracks = getPreloadTracks({
    repeating: true,
    currentTrackIndex: 0,
    queue: makeQueue(5),
  });

  expect(tracks).toHaveLength(4);
  expect(tracks[0].Id).toBe('0');
  expect(tracks[1].Id).toBe('1');
  expect(tracks[2].Id).toBe('2');
  expect(tracks[3].Id).toBe('4');
});

it('should skip duplicates', () => {
  const tracks = getPreloadTracks({
    repeating: true,
    currentTrackIndex: 0,
    queue: [...makeQueue(1), ...makeQueue(2)],
  });

  expect(tracks).toHaveLength(2);
  expect(tracks[0].Id).toBe('0');
  expect(tracks[1].Id).toBe('1');
});
