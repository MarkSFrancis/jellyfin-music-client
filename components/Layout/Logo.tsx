import { forwardRef, Image, ImageProps } from '@chakra-ui/react';

export const Logo = forwardRef<ImageProps, typeof Image>((props, ref) => {
  return <Image alt="Jellyfin logo" src="/logo.svg" ref={ref} {...props} />;
});
