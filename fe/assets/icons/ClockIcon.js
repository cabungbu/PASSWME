import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"

const ClockIcon = ({size}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill="none"
  >
    <G clipPath="url(#a)">
      <Path
        fill="url(#b)"
        d="M15 6.563a.938.938 0 0 0-1.875 0v10.312a.938.938 0 0 0 .473.814l6.562 3.75a.938.938 0 0 0 .93-1.628L15 16.331V6.563Z"
      />
      <Path
        fill="url(#c)"
        d="M15 30a15 15 0 1 0 0-30 15 15 0 0 0 0 30Zm13.125-15a13.125 13.125 0 1 1-26.25 0 13.125 13.125 0 0 1 26.25 0Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={13.125}
        x2={26.285}
        y1={5.625}
        y2={12.581}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.245} stopColor="#E30414" />
        <Stop offset={0.96} stopColor="#84020C" />
        <Stop offset={1} stopColor="#7D020B" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={0}
        x2={30}
        y1={0}
        y2={30}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.245} stopColor="#E30414" />
        <Stop offset={0.96} stopColor="#84020C" />
        <Stop offset={1} stopColor="#7D020B" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h30v30H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ClockIcon
