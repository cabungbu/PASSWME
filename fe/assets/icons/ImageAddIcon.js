import React from "react";
import Svg, { Path } from "react-native-svg";

const ImageAddIcon = ({ size, strokeColor = "#D9D9D9" }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 35 35"
    >
      <Path
        fill={strokeColor}
        d="M32.083 9.844a1.094 1.094 0 1 0 0-2.188v2.188ZM20.417 7.656a1.094 1.094 0 1 0 0 2.188V7.656Zm6.927-4.74a1.094 1.094 0 1 0-2.188 0h2.188Zm-2.188 11.667a1.094 1.094 0 0 0 2.188 0h-2.188Zm6.927-6.927H26.25v2.188h5.833V7.656Zm-5.833 0h-5.833v2.188h5.833V7.656Zm-1.094-4.74V8.75h2.188V2.917h-2.188Zm0 5.834v5.833h2.188V8.75h-2.188Z"
      />
      <Path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M16.77 4.375c-6.53 0-9.796 0-11.825 2.029-2.028 2.028-2.028 5.293-2.028 11.825 0 6.53 0 9.797 2.028 11.826 2.029 2.028 5.294 2.028 11.826 2.028 6.53 0 9.797 0 11.825-2.028 2.029-2.029 2.029-5.294 2.029-11.826V17.5"
      />
      <Path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M2.917 20.614a18.575 18.575 0 0 1 2.73-.193c3.867-.081 7.64 1.123 10.645 3.4 2.786 2.111 4.744 5.016 5.583 8.262"
      />
      <Path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M30.625 24.64c-1.713-.868-3.487-1.308-5.27-1.307-2.7-.01-5.373.982-7.855 2.917"
      />
    </Svg>
  );
};

export default ImageAddIcon;
