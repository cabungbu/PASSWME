import React from "react";
import Svg, { Defs, Path, LinearGradient, Stop } from "react-native-svg";

const ShirtIcon = ({ size }) => {
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
        d="M20 7.5c2.584 0 4.743-2.014 5-4.531.023-.235-.234-.469-.469-.469-.127 0-.252.024-.37.07-.016.007-1.649.633-4.161.633-2.512 0-4.148-.625-4.16-.633a1.266 1.266 0 0 0-.415-.07h-.005a.444.444 0 0 0-.42.469C15.262 5.48 17.422 7.5 20 7.5Z"
      />
      <Path
        fill="url(#b)"
        d="m37.913 7.024-10.1-3.536a.313.313 0 0 0-.412.246 7.5 7.5 0 0 1-14.796 0 .313.313 0 0 0-.418-.246l-10.1 3.536a1.25 1.25 0 0 0-.815 1.414l1.3 6.875a1.25 1.25 0 0 0 1.087 1.007l3.818.432a.625.625 0 0 1 .555.64l-.573 18.82a1.25 1.25 0 0 0 .711 1.167c.182.082.38.124.58.121h22.5c.2.003.398-.039.58-.121a1.25 1.25 0 0 0 .71-1.167l-.572-18.82a.626.626 0 0 1 .555-.64l3.818-.432a1.25 1.25 0 0 0 1.088-1.007l1.3-6.875a1.25 1.25 0 0 0-.816-1.414Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={14.999}
          x2={18.999}
          y1={2.5}
          y2={10.501}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.245} stopColor="#E30414" />
          <Stop offset={0.96} stopColor="#84020C" />
          <Stop offset={1} stopColor="#7D020B" />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={1.25}
          x2={35.122}
          y1={3.468}
          y2={40.793}
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

export default ShirtIcon;
