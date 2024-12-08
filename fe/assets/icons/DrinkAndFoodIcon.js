import * as React from "react";
import Svg, { Defs, Path, LinearGradient, Stop } from "react-native-svg";

const DrinkAndFoodIcon = ({ size }) => {
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
        d="M30.1 38.333h2.767c1.4 0 2.55-1.083 2.716-2.45l2.75-27.466H30v-6.75h-3.283v6.75h-8.284l.5 3.9c2.85.783 5.517 2.2 7.117 3.766 2.4 2.367 4.05 4.817 4.05 8.817v13.433ZM1.667 36.667V35h25.05v1.667c0 .9-.75 1.666-1.717 1.666H3.333a1.682 1.682 0 0 1-1.666-1.666ZM26.717 25c0-13.333-25.05-13.333-25.05 0h25.05Zm-25.05 3.333h25v3.334h-25v-3.334Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={1.667}
          x2={38.333}
          y1={1.667}
          y2={38.333}
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

export default DrinkAndFoodIcon;
