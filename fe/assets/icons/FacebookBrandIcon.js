import Svg, { Path } from "react-native-svg"
import React from 'react'

const FacebookBrandIcon = ({size}) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 30 30"
  >
    <Path
      fill="#0078FF"
      fillRule="evenodd"
      d="M30 15.091C30 6.757 23.284 0 15 0 6.716 0 0 6.757 0 15.091 0 22.623 5.485 28.867 12.656 30V19.455h-3.81V15.09h3.81v-3.325c0-3.782 2.24-5.873 5.666-5.873 1.641 0 3.358.295 3.358.295v3.714h-1.892c-1.862 0-2.445 1.163-2.445 2.358v2.831h4.16l-.664 4.363h-3.496V30C24.515 28.869 30 22.625 30 15.09Z"
      clipRule="evenodd"
    />
  </Svg>
  )
}

export default FacebookBrandIcon