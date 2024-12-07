import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

const PWMCoinIcon = ({size}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill="none"
  >
    <Path
      fill="url(#a)"
      d="M10.313 17.833c.142 1.789 1.556 3.182 4.09 3.347v1.32h1.126v-1.33c2.625-.183 4.159-1.586 4.159-3.622 0-1.85-1.174-2.805-3.272-3.3l-.887-.21v-3.594c1.125.127 1.841.742 2.014 1.593h1.972c-.143-1.723-1.62-3.07-3.986-3.217V7.5h-1.125v1.348c-2.24.22-3.769 1.568-3.769 3.474 0 1.688 1.136 2.76 3.024 3.201l.745.184v3.814c-1.153-.175-1.916-.807-2.089-1.688h-2.002Zm4.081-4.061c-1.106-.257-1.706-.78-1.706-1.568 0-.88.647-1.54 1.716-1.734v3.3l-.01.002Zm1.298 2.237c1.344.311 1.965.815 1.965 1.706 0 1.016-.773 1.714-2.128 1.841v-3.585l.163.038Z"
    />
    <Path
      fill="url(#b)"
      d="M15 28.125a13.125 13.125 0 1 1 0-26.25 13.125 13.125 0 0 1 0 26.25ZM15 30a15 15 0 1 0 0-30 15 15 0 0 0 0 30Z"
    />
    <Path
      fill="url(#c)"
      d="M15 25.313a10.312 10.312 0 1 1 0-20.625 10.312 10.312 0 0 1 0 20.625Zm0 .937a11.25 11.25 0 1 0 0-22.499 11.25 11.25 0 0 0 0 22.499Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={10.313}
        x2={23.796}
        y1={7.5}
        y2={15.927}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.245} stopColor="#E30414" />
        <Stop offset={0.96} stopColor="#84020C" />
        <Stop offset={1} stopColor="#7D020B" />
      </LinearGradient>
      <LinearGradient
        id="b"
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
      <LinearGradient
        id="c"
        x1={3.75}
        x2={26.25}
        y1={3.75}
        y2={26.25}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.245} stopColor="#E30414" />
        <Stop offset={0.96} stopColor="#84020C" />
        <Stop offset={1} stopColor="#7D020B" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default PWMCoinIcon
