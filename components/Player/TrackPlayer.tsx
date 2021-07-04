import { useTrack } from "./useTrack";
import { useApi } from "../Jellyfin";
import React, { FC } from "react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

export const TrackPlayer: FC = () => {
  const { auth } = useApi();
  const defaultTrackId = `298332b3fa37fe629a3179b69594259a`;
  const defaultTrackContainer = "opus";
  const defaultTrackSrc = getTrackSrc({
    serverUrl: auth.serverUrl,
    userToken: auth.authToken,
    trackContainer: defaultTrackContainer,
    trackId: defaultTrackId,
  });

  const [playing, setPlaying] = useState<"playing" | "paused">("paused");

  useTrack({
    src: defaultTrackSrc,
    state: playing,
  });

  return (
    <>
      <Button
        onClick={() =>
          setPlaying((p) => (p === "playing" ? "paused" : "playing"))
        }
      >
        {playing === "playing" ? "Playing" : "Paused"}
      </Button>{" "}
      track ID: {defaultTrackId}
    </>
  );
};

interface GetTrackSrcOptions {
  serverUrl: string;
  trackId: string;
  trackContainer: string;
  deviceId?: string;
  userToken?: string;
  trackTag?: string;
}

const getTrackSrc = (options: GetTrackSrcOptions) => {
  const src = new URL(
    `Audio/${options.trackId}/stream.${options.trackContainer}`,
    options.serverUrl
  );

  src.searchParams.set("Static", "true");
  src.searchParams.set("mediaSourceId", options.trackId);

  if (options.deviceId) {
    src.searchParams.set("deviceId", options.deviceId);
  }

  if (options.userToken) {
    src.searchParams.set("api_key", options.userToken);
  }

  if (options.trackTag) {
    src.searchParams.set("Tag", options.trackTag);
  }

  return src.toString();
};
