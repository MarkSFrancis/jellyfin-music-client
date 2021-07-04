import { useRef } from "react";
import { Howl } from "howler";
import { useEffect } from "react";

export interface TrackOptions {
  state: "playing" | "paused";
  src: string;
}

export const useTrack = (options: TrackOptions) => {
  const currentSrc = useRef(options.src);
  const howler = useRef<Howl>();

  if (!howler.current) {
    console.log("Creating howl");
    howler.current = createHowl(options);
  }

  useEffect(() => {
    if (currentSrc.current !== options.src) {
      console.log("track changed");
      howler.current.unload();
      howler.current = createHowl(options);
      currentSrc.current = options.src;
    }
  }, [options]);

  useEffect(() => {
    if (options.state === "playing") {
      howler.current.play();
    } else {
      howler.current.pause();
    }
  }, [options.state]);

  useEffect(() => {
    howler.current.unload();
  }, []);

  return howler;
};

const createHowl = (options: TrackOptions) => {
  return new Howl({
    src: options.src,
    html5: true,
    autoplay: options.state === "playing",
  });
};
