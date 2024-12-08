import React from "react";
import Svg, { Defs, Path, LinearGradient, Stop } from "react-native-svg";

const BabyCarriageIcon = ({ size }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 40 40"
    >
      <Path
        fill="url(#a)"
        d="M21.667 3.333v13.334H35A13.333 13.333 0 0 0 21.667 3.333ZM32.2 26.483a13.25 13.25 0 0 0 2.8-8.15H10.733L9.167 15H3.333v3.333h3.7s3.15 6.784 3.534 7.367A5.795 5.795 0 0 0 7.5 30.833a5.833 5.833 0 0 0 5.833 5.834 5.822 5.822 0 0 0 5.767-5h3.467c.4 2.833 2.833 5 5.766 5a5.833 5.833 0 0 0 5.834-5.834 5.807 5.807 0 0 0-1.967-4.35Zm-18.867 6.85a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm15 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={3.333}
          x2={36.623}
          y1={3.333}
          y2={34.958}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.245} stopColor="#E30414" />
          <Stop offset={0.96} stopColor="#84020C" />
          <Stop offset={1} stopColor="#7D020B" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default BabyCarriageIcon;
