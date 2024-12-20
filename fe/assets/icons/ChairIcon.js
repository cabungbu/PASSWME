import * as React from "react";
import Svg, { Defs, Path, LinearGradient, Stop } from "react-native-svg";

const ChairIcon = ({ size }) => {
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
        d="M8.398 32.243a.807.807 0 0 1-.595-.238.804.804 0 0 1-.24-.595v-1.667h-.896c-.94 0-1.73-.32-2.372-.961-.641-.642-.962-1.432-.962-2.372v-8.333c0-.703.241-1.295.724-1.777.48-.482 1.073-.723 1.776-.723.704 0 1.296.24 1.777.723.482.482.723 1.074.723 1.777v5.833h23.334v-5.833c0-.703.24-1.295.723-1.777.481-.482 1.073-.723 1.777-.723.703 0 1.295.24 1.776.723.483.482.724 1.074.724 1.777v8.333c0 .94-.32 1.73-.962 2.372-.641.64-1.432.961-2.372.961h-.896v1.667a.854.854 0 0 1-.224.578.7.7 0 0 1-.546.255.811.811 0 0 1-.834-.833v-1.667H9.232v1.667c0 .238-.08.436-.24.595a.804.804 0 0 1-.594.238Zm1.602-10v-4.166a4.45 4.45 0 0 0-.932-2.774c-.62-.813-1.42-1.278-2.401-1.393v-1.858c0-.94.32-1.731.961-2.372.641-.641 1.432-.962 2.372-.963h20c.94 0 1.73.32 2.372.961.64.641.961 1.432.961 2.372v1.858c-.987.111-1.79.571-2.406 1.38-.618.81-.927 1.74-.927 2.789v4.166H10Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={3.333}
          x2={25.501}
          y1={8.717}
          y2={40.124}
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

export default ChairIcon;
