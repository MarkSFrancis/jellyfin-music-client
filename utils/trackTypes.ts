// TODO Add support for album art

import {
  BaseItemDto,
  LocationType,
  MediaSourceInfo,
  MediaProtocol,
  MediaSourceType,
  MediaStreamType,
} from "@jellyfin/sdk/lib/generated-client/models";

export interface Track extends BaseItemDto {
  Name: string;
  ServerId: string;
  Id: string;
  Etag: string;
  DateCreated: string;
  CanDelete: boolean;
  CanDownload: boolean;
  MediaSources: MediaSource[];
  Path: string;
  ChannelId: null;
  Genres: string[];
  RunTimeTicks: number;
  IsFolder: boolean;
  GenreItems: AlbumArtist[];
  UserData: UserData;
  Tags: string[];
  Artists: string[];
  ArtistItems: AlbumArtist[];
  AlbumArtist: string;
  AlbumArtists: AlbumArtist[];
  MediaStreams: MediaStream[];
  BackdropImageTags: string[];
  LocationType: LocationType;
}

export interface AlbumArtist {
  Name: string;
  Id: string;
}

export interface MediaSource extends MediaSourceInfo {
  Protocol: MediaProtocol;
  Id: string;
  Path: string;
  Type: MediaSourceType;
  Container: string;
  Size: number;
  Name: string;
  IsRemote: boolean;
  ETag: string;
  RunTimeTicks: number;
  ReadAtNativeFramerate: boolean;
  IgnoreDts: boolean;
  IgnoreIndex: boolean;
  GenPtsInput: boolean;
  SupportsTranscoding: boolean;
  SupportsDirectStream: boolean;
  SupportsDirectPlay: boolean;
  IsInfiniteStream: boolean;
  RequiresOpening: boolean;
  RequiresClosing: boolean;
  RequiresLooping: boolean;
  SupportsProbing: boolean;
  MediaStreams: MediaStream[];
  Bitrate: number;
  DefaultAudioStreamIndex: number;
}

export interface MediaStream {
  Codec: string;
  Language: string;
  TimeBase: string;
  CodecTimeBase: string;
  Title: string;
  DisplayTitle: string;
  IsInterlaced: boolean;
  ChannelLayout: string;
  BitRate: number;
  Channels: number;
  SampleRate: number;
  IsDefault: boolean;
  IsForced: boolean;
  Type: MediaStreamType;
  Index: number;
  IsExternal: boolean;
  IsTextSubtitleStream: boolean;
  SupportsExternalStream: boolean;
  Level: number;
}

export interface UserData {
  PlaybackPositionTicks: number;
  PlayCount: number;
  IsFavorite: boolean;
  LastPlayedDate: string;
  Played: boolean;
  Key: string;
}
