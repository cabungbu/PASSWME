import * as React from "react"
import Svg, { Path } from "react-native-svg"

const PasswordReset = ({size}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 27 25"
  >
    <Path
      fill="#121212"
      d="M.5 4.281A3.906 3.906 0 0 1 4.406.375h17.188A3.906 3.906 0 0 1 25.5 4.281v9.54a6.88 6.88 0 0 0-1.563-.971V4.281a2.344 2.344 0 0 0-2.343-2.343H4.406A2.344 2.344 0 0 0 2.063 4.28v9.688a2.343 2.343 0 0 0 2.343 2.344h8.534l1.563 1.562H4.405A3.906 3.906 0 0 1 .5 13.969V4.28Zm18.281 7.344a.778.778 0 0 1-.496-.178 2 2 0 0 0-.275-.732.781.781 0 0 1 .771-.652h2.813a.781.781 0 1 1 0 1.562H18.78Zm-4.051-2.5.777.777a2 2 0 0 0-.662.443l-.553.553-.667-.668-1.166 1.166a.781.781 0 0 1-1.105-1.105l1.166-1.166-1.166-1.166a.781.781 0 0 1 1.105-1.105l1.166 1.166 1.166-1.166a.782.782 0 0 1 1.105 1.105L14.73 9.125ZM4.479 6.854a.781.781 0 0 1 1.105 0L6.75 8.02l1.166-1.166a.781.781 0 0 1 1.105 1.105L7.855 9.125l1.166 1.166a.782.782 0 0 1-1.105 1.105L6.75 10.23l-1.166 1.166a.781.781 0 0 1-1.105-1.105l1.166-1.166-1.166-1.166a.781.781 0 0 1 0-1.105Zm12.355 5.48a.782.782 0 0 0-1.105-1.105l-2.5 2.5a.783.783 0 0 0 0 1.105l2.5 2.5a.781.781 0 1 0 1.105-1.105l-1.166-1.166h5.457a4.063 4.063 0 1 1-4.01 4.72.782.782 0 0 0-1.542.251 5.626 5.626 0 1 0 5.552-6.534h-5.457l1.166-1.166Z"
    />
  </Svg>
)

export default PasswordReset