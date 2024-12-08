import React from 'react'
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const GoogleBrandIcon = ({size}) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 30 30"
  >
    <G clipPath="url(#a)">
      <Path
        fill="#4285F4"
        d="M29.642 15.345c0-1.02-.083-2.045-.26-3.048H15.235v5.776h8.103a6.943 6.943 0 0 1-2.999 4.559v3.748h4.834c2.838-2.613 4.47-6.471 4.47-11.035Z"
      />
      <Path
        fill="#E30414"
        d="M15.234 30.001c4.046 0 7.458-1.328 9.943-3.621l-4.833-3.748c-1.345.915-3.081 1.433-5.104 1.433-3.913 0-7.231-2.64-8.422-6.19H1.83v3.864a15.002 15.002 0 0 0 13.404 8.262Z"
      />
      <Path
        fill="#FBBC04"
        d="M6.813 17.875a8.985 8.985 0 0 1 0-5.743V8.27H1.83a15.013 15.013 0 0 0 0 13.47l4.983-3.864Z"
      />
      <Path
        fill="#EA4335"
        d="M15.234 5.937a8.151 8.151 0 0 1 5.755 2.249l4.282-4.283A14.416 14.416 0 0 0 15.234.001 14.997 14.997 0 0 0 1.83 8.269l4.983 3.863c1.185-3.555 4.508-6.195 8.421-6.195Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h30v30H0z" />
      </ClipPath>
    </Defs>
  </Svg>
  )
}

export default GoogleBrandIcon