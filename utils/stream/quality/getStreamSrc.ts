import { QualityMode } from './qualityMode';
import { MediaSource } from '../../trackTypes';
import { getAudioSrcQuality } from './getAudioSrcQuality';
import { getQualityDiff } from './getQualityDiff';

export interface StreamSrcOptions {
  trackId: string;
  stream: MediaSource;
  targetQuality: QualityMode;
  serverUrl: string;
}

export const getStreamUrlAtQuality = (options: StreamSrcOptions) => {
  const quality = getAudioSrcQuality(options.stream);

  const qualityDiff = getQualityDiff(quality, options.targetQuality);

  if (qualityDiff <= 0) {
    // Stream at original quality
    return getStreamUrlAsOriginalQuality(options);
  }

  switch (options.targetQuality) {
    case 'ORIGINAL_QUALITY':
      return getStreamUrlAsOriginalQuality(options);
    case 'HIGH_QUALITY':
      return getStreamUrlAsHighQuality(options);
    case 'MEDIUM_QUALITY':
      return getStreamUrlAsMediumQuality(options);
    case 'LOW_QUALITY':
      return getStreamUrlAsLowQuality(options);
    default:
      throw new Error(
        `Unknown target quality level: "${options.targetQuality as string}"`
      );
  }
};

const getStreamUrlAsOriginalQuality = (
  options: Omit<StreamSrcOptions, 'targetQuality'>
) => {
  const src = new URL(
    `Audio/${options.trackId}/stream.${options.stream.Container}`,
    options.serverUrl
  );

  src.searchParams.set('static', 'true');

  return src;
};

const getStreamUrlAsLowQuality = (
  options: Omit<StreamSrcOptions, 'targetQuality'>
) => {
  const src = new URL(
    `Audio/${options.trackId}/stream.opus`,
    options.serverUrl
  );
  src.searchParams.set('audioCodec', 'opus');
  src.searchParams.set('audioBitRate', '128000');
  src.searchParams.set('context', 'static');

  return src;
};

const getStreamUrlAsMediumQuality = (
  options: Omit<StreamSrcOptions, 'targetQuality'>
) => {
  const src = new URL(
    `Audio/${options.trackId}/stream.opus`,
    options.serverUrl
  );
  src.searchParams.set('audioCodec', 'opus');
  src.searchParams.set('audioBitRate', '256000');
  src.searchParams.set('context', 'static');

  return src;
};

const getStreamUrlAsHighQuality = (
  options: Omit<StreamSrcOptions, 'targetQuality'>
) => {
  const src = new URL(
    `Audio/${options.trackId}/stream.opus`,
    options.serverUrl
  );
  src.searchParams.set('audioCodec', 'opus');
  src.searchParams.set('audioBitRate', '320000');
  src.searchParams.set('context', 'static');

  return src;
};
