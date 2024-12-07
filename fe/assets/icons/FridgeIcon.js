import * as React from "react";
import Svg, { Defs, Path, LinearGradient, Stop } from "react-native-svg";

const FridgeIcon = ({ size }) => {
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
        d="M11.667 3.333h16.666a3.333 3.333 0 0 1 3.334 3.334V15H8.333V6.667a3.333 3.333 0 0 1 3.334-3.334Zm20 28.334A3.333 3.333 0 0 1 28.333 35v1.667H25V35H15v1.667h-3.333V35a3.333 3.333 0 0 1-3.334-3.333v-15h23.334v15ZM13.333 8.333v3.334h3.334V8.333h-3.334Zm0 11.667v5h3.334v-5h-3.334Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={8.333}
          x2={39.653}
          y1={3.333}
          y2={25.257}
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

export default FridgeIcon;
