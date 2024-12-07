import * as React from "react";
import Svg, { Defs, Path, LinearGradient, Stop } from "react-native-svg";

const AllCategoryIcon = ({ size }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 27 31" 
    >
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M8.03 6.949v-1.48a5.469 5.469 0 0 1 10.938 0v1.48c1.876.057 3.026.258 3.902.986 1.215 1.009 1.536 2.715 2.176 6.13l1.094 5.833c.9 4.8 1.349 7.2.038 8.782-1.313 1.58-3.756 1.58-8.64 1.58H9.46c-4.885 0-7.326 0-8.639-1.58-1.312-1.581-.86-3.982.038-8.782l1.094-5.834c.641-3.412.96-5.12 2.176-6.13.876-.727 2.025-.928 3.902-.985Zm2.188-1.48a3.281 3.281 0 0 1 6.562 0v1.458h-6.562V5.47ZM9.124 17.423c0 1.435 1.699 2.951 2.98 3.892.612.45.918.674 1.395.674.478 0 .783-.225 1.395-.674 1.28-.94 2.98-2.457 2.98-3.894 0-2.438-2.406-3.35-4.375-1.465-1.969-1.884-4.375-.974-4.375 1.467Z"
        clipRule="evenodd"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={0}
          x2={30.064}
          y1={0}
          y2={26.823}
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

export default AllCategoryIcon;
