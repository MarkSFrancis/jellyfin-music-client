import { FC } from "react";

type LogoProps = {
  width?: number | string;
  height?: number | string;
  alt?: string;
};

export const Logo: FC<LogoProps> = (props) => {
  const { alt: title, ...svgProps } = props;

  return (
    <svg
      version="1.1"
      id="icon-transparent"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      {...svgProps}
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient
          id="linear-gradient"
          gradientUnits="userSpaceOnUse"
          x1="110.25"
          y1="213.3"
          x2="496.14"
          y2="436.09"
        >
          <stop offset="0" style={{ stopColor: "#AA5CC3" }} />
          <stop offset="1" style={{ stopColor: "#00A4DC" }} />
        </linearGradient>
      </defs>
      <title>icon-transparent</title>
      <g id="icon-transparent">
        <path
          id="inner-shape"
          d="M256,201.6c-20.4,0-86.2,119.3-76.2,139.4s142.5,19.9,152.4,0S276.5,201.6,256,201.6z"
          fill="url(#linear-gradient)"
        />
        <path
          id="outer-shape"
          d="M256,23.3c-61.6,0-259.8,359.4-229.6,420.1s429.3,60,459.2,0S317.6,23.3,256,23.3z
		M406.5,390.8c-19.6,39.3-281.1,39.8-300.9,0s110.1-275.3,150.4-275.3S426.1,351.4,406.5,390.8z"
          fill="url(#linear-gradient)"
        />
      </g>
    </svg>
  );
};
