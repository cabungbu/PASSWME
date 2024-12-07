import * as React from "react";
import Svg, { Defs, Path, LinearGradient, Stop } from "react-native-svg";

const MotobikeIcon = ({ size }) => {
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
        d="M16.25 11.25H12.5a2.5 2.5 0 0 0-2.5 2.5v11.512c2.894.83 5 3.528 5 6.664a1.83 1.83 0 0 1-1.275 1.741l-.01.083H24.59a5.625 5.625 0 0 1 3.535-10h5.108a5.51 5.51 0 0 1 1.767.289v-.289A3.75 3.75 0 0 0 31.25 20H18.125a.624.624 0 0 0-.625.625V22.5A2.5 2.5 0 0 0 20 25h.625a1.875 1.875 0 1 1 0 3.75h-4.791a.834.834 0 0 1-.834-.834V13.75h1.25a1.25 1.25 0 0 0 0-2.5Z"
      />
      <Path
        fill="url(#b)"
        d="M19.584 16.25c-1.15 0-2.084.933-2.084 2.084 0 .23.188.416.416.416h10.418c.23 0 .416-.188.416-.416 0-1.15-.933-2.084-2.084-2.084h-7.082ZM12.5 33.125a4.376 4.376 0 1 1-8.706-.625h-.725a.575.575 0 0 1-.569-.574c0-3.106 2.519-5.676 5.625-5.676s5.625 2.57 5.625 5.676a.575.575 0 0 1-.568.574h-.726c.03.204.044.413.044.625ZM6.356 32.5a1.875 1.875 0 1 0 3.538 0H6.356Zm29.85 1.25a4.376 4.376 0 0 1-8.667-.039A4.375 4.375 0 0 1 28.125 25h5.108a4.268 4.268 0 0 1 4.267 4.267V32.5a1.25 1.25 0 0 1-1.25 1.25h-.044Zm-6.1 0a1.875 1.875 0 0 0 3.538 0h-3.538Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={10}
          x2={32.376}
          y1={11.25}
          y2={36.112}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.245} stopColor="#E30414" />
          <Stop offset={0.96} stopColor="#84020C" />
          <Stop offset={1} stopColor="#7D020B" />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={2.5}
          x2={21.352}
          y1={16.25}
          y2={47.302}
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

export default MotobikeIcon;
