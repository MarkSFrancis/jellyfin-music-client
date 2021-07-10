import { Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { usePlayerCurrentTrack } from "../../utils";
import { SecondaryText } from "../Typography";

export const PlayerBarTrackDisplay: FC = () => {
  const { track } = usePlayerCurrentTrack();

  if (!track) {
    return <></>;
  }

  return (
    <>
      <Text>{track.Name}</Text>
      <SecondaryText>
        {track.ArtistItems.map((a) => (
          <span key={a.Id}>{a.Name}</span>
        ))}
      </SecondaryText>
    </>
  );
};
