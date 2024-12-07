import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DeliveryIcon = ({size, color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 35 35"
    fill="none"    
    stroke={color}

  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.2}
      d="m14.583 24.063 4.375 1.458s10.938-2.188 12.396-2.188c1.459 0 1.459 1.459 0 2.917-1.458 1.459-6.562 5.834-10.937 5.834-4.375 0-7.292-2.188-10.209-2.188H2.917"
    />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.2}
      d="M2.917 21.146c1.458-1.458 4.375-3.646 7.291-3.646 2.917 0 9.844 2.917 10.938 4.375 1.094 1.459-2.188 3.646-2.188 3.646m-7.291-12.396V7.292a1.458 1.458 0 0 1 1.458-1.458h17.5a1.458 1.458 0 0 1 1.458 1.458v11.666"
    />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.2}
      d="M18.23 5.833h7.29v6.563h-7.29V5.833Z"
    />
  </Svg>
)
export default DeliveryIcon
