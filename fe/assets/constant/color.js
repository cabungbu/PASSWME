import React from "react";
import { LinearGradient, Stop } from "react-native-svg";

export const COLOR = {
  mainColor: "#E30414",
  gradientColor: ["#E30414", "#B80310", "#84020C", "#7D020B"],
  disableWhiteColor: "rgba(255, 255, 255, 0.5)",
  successColor: "#369C33",
  sentColor: "#4FA84C" 
};

export const ButtonGradient = () => (
  <LinearGradient
    id="b"
    x1={2.501}
    x2={27.501}
    y1={1.5}
    y2={26.499}
    gradientUnits="userSpaceOnUse"
  >
    <Stop offset={0.245} stopColor="#E30414" />
    <Stop offset={0.96} stopColor="#84020C" />
    <Stop offset={1} stopColor="#7D020B" />
  </LinearGradient>
);
