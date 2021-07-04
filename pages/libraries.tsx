import { useMusicLibraryConfig } from "../components/Jellyfin";

export default function Libraries() {
  const library = useMusicLibraryConfig();

  return <>{library?.name ?? "Loading..."}</>;
}
