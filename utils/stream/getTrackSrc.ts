import { ApiConfig } from '../apiConfig/apiConfigSlice';
import { Track, MediaSource } from '../trackTypes';
import { getStreamUrlAtQuality } from './quality/getStreamSrc';
import { DEFAULT_QUALITY_MODE, QualityMode } from './quality/qualityMode';

export const getTrackSrc = (auth: ApiConfig, track: Track) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const stream = track.MediaSources?.[0];
  if (!(stream as MediaSource | undefined)) {
    throw new Error('Cannot generate streaming URL');
  }

  return getStreamSrc({
    serverUrl: auth.server.url,
    stream,
    trackId: stream.Id,
    userToken: auth.authToken,
  });
};

interface GenerateTrackSrcOptions {
  serverUrl: string;
  trackId: string;
  stream: MediaSource;
  quality?: QualityMode;
  deviceId?: string;
  userToken?: string;
}

const getStreamSrc = (options: GenerateTrackSrcOptions) => {
  const src = getStreamUrlAtQuality({
    serverUrl: options.serverUrl,
    stream: options.stream,
    targetQuality: DEFAULT_QUALITY_MODE,
    trackId: options.trackId,
  });

  src.searchParams.set('mediaSourceId', options.trackId);

  if (options.deviceId) {
    src.searchParams.set('deviceId', options.deviceId);
  }

  if (options.userToken) {
    src.searchParams.set('api_key', options.userToken);
  }

  return src.toString();
};
