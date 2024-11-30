import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
import { ButtonGradient } from "../constant/color"

const ComplainIcon = ({size}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    width={size}
    viewBox="0 0 30 29"
    fill="none"
  >
    <G filter="url(#a)">
      <Path
        stroke="url(#b)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21.245 10.266h.01m0-2.505v-3.13M9.377 26.5h-3.48c-.403 0-.81-.058-1.18-.216-1.208-.519-1.822-1.205-2.107-1.634a.675.675 0 0 1 .037-.789c1.4-1.86 4.645-2.982 6.73-2.982m.007 5.621h3.479c.405 0 .81-.058 1.18-.216 1.21-.519 1.822-1.205 2.108-1.634a.675.675 0 0 0-.037-.789c-1.4-1.86-4.645-2.982-6.73-2.982M27.5 7.49c0 3.307-2.8 5.99-6.255 5.99-.407 0-.81-.037-1.21-.113-.288-.053-.43-.08-.531-.065-.1.016-.243.09-.525.243-.81.431-1.74.576-2.643.411.343-.422.575-.928.679-1.471.063-.331-.093-.654-.325-.89a5.838 5.838 0 0 1-1.7-4.105c0-3.308 2.8-5.99 6.255-5.99S27.5 4.183 27.5 7.49Zm-14.644 6.871a3.47 3.47 0 0 1-4.8 3.203 3.47 3.47 0 0 1-2.147-3.203 3.47 3.47 0 0 1 3.475-3.466 3.47 3.47 0 0 1 3.472 3.466Z"
        shapeRendering="crispEdges"
      />
    </G>
    <Defs>
      <ButtonGradient/>
    </Defs>
  </Svg>
);

export default ComplainIcon
