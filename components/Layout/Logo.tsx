import { forwardRef, Image, ImageProps } from "@chakra-ui/react";

export const Logo = forwardRef<ImageProps, typeof Image>((props, ref) => {
  return <Image src="/logo.svg" ref={ref} {...props} />;
});
