import * as React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

const ComputorIcon = ({ size }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 50 40"
    >
      <Path
        fill="url(#a)"
        d="M30 8v17.5H5V8h25ZM5 3C2.242 3 0 5.242 0 8v17.5c0 2.758 2.242 5 5 5h9.164l-.836 2.5H7.5A2.497 2.497 0 0 0 5 35.5C5 36.883 6.117 38 7.5 38h20c1.383 0 2.5-1.117 2.5-2.5S28.883 33 27.5 33h-5.836l-.836-2.5H30c2.758 0 5-2.242 5-5V8c0-2.758-2.242-5-5-5H5Zm36.25 0c-2.07 0-3.75 1.68-3.75 3.75v27.5c0 2.07 1.68 3.75 3.75 3.75h5c2.07 0 3.75-1.68 3.75-3.75V6.75C50 4.68 48.32 3 46.25 3h-5Zm1.25 5H45c.688 0 1.25.563 1.25 1.25 0 .688-.563 1.25-1.25 1.25h-2.5c-.688 0-1.25-.563-1.25-1.25 0-.688.563-1.25 1.25-1.25Zm-1.25 6.25c0-.688.563-1.25 1.25-1.25H45c.688 0 1.25.563 1.25 1.25 0 .688-.563 1.25-1.25 1.25h-2.5c-.688 0-1.25-.563-1.25-1.25Zm2.5 12.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={0}
          x2={32.886}
          y1={3}
          y2={49.98}
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

export default ComputorIcon;
