import { Dimensions } from "react-native";

const designWidth = 430; // Chiều rộng thiết kế
const designHeight = 932; // Chiều cao thiết kế

function scaleWidth(number) {
  const currentDeviceWidth = Dimensions.get("window").width;
  return (number / designWidth) * currentDeviceWidth;
}

function scaleHeight(number) {
  const currentDeviceHeight = Dimensions.get("window").height;
  return (number / designHeight) * currentDeviceHeight;
}

export { scaleWidth, scaleHeight };