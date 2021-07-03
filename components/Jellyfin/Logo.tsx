import Image, { ImageProps } from "next/image";
import { FC } from "react";
import logoRaw from "./logo-raw.svg";

type LogoProps = Pick<ImageProps, "width" | "height" | "alt">;

export const Logo: FC<LogoProps> = (props) => {
  return <Image alt="Logo" {...props} src={logoRaw as StaticImageData} />;
};
