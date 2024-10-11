import {
  forwardRef,
  Text,
  TextProps,
  useColorModeValue,
} from '@chakra-ui/react';

export const SecondaryText = forwardRef<TextProps, typeof Text>(
  (props, ref) => {
    const subtextColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.700');

    return <Text ref={ref} color={subtextColor} {...props}></Text>;
  }
);
