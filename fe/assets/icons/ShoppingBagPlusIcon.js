import React from 'react'
import Svg, { G, Path, Defs } from "react-native-svg"
import { ButtonGradient } from '../constant/color'

const ShoppingBagPlusIcon = ({size}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="url(#b)"
    >
      <G filter="url(#a)">
        <Path
          stroke="url(#b)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.5}
          shapeRendering="crispEdges"
          d="M15.75 25.5a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Zm0-10.5a.75.75 0 0 1 .75.75V18h2.25a.75.75 0 1 1 0 1.5H16.5v2.25a.75.75 0 1 1-1.5 0V19.5h-2.25a.75.75 0 1 1 0-1.5H15v-2.25a.75.75 0 0 1 .75-.75ZM9 .75a3.75 3.75 0 0 0-6 3V6H1.5A1.5 1.5 0 0 0 0 7.5v12A4.5 4.5 0 0 0 4.5 24h4.886a8.25 8.25 0 0 1-.986-1.5H4.5a3 3 0 0 1-3-3v-12h9v4.886A8.25 8.25 0 0 1 12 11.4V7.5h4.5v3.033c.516.047 1.016.14 1.5.277V7.5A1.5 1.5 0 0 0 16.5 6H15V3.75a3.75 3.75 0 0 0-6-3Zm-4.5 3a2.25 2.25 0 1 1 4.5 0V6H4.5V3.75ZM10 1.878a2.25 2.25 0 0 1 3.5 1.872V6h-3V3.75c0-.681-.181-1.32-.5-1.872Z"
        />
      </G>
      <Defs>
        <ButtonGradient/>
      </Defs>
    </Svg>
  )
}

export default ShoppingBagPlusIcon; 
