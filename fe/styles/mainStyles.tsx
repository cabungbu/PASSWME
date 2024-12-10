import { StatusBar, StyleSheet } from "react-native";
import { COLOR } from "../assets/constant/color";
import { scaleHeight, scaleWidth } from "../assets/constant/responsive";

const statusBarHeight = StatusBar.currentHeight || 20;

const mainStyles = StyleSheet.create({
  headerContainer: {
    height: scaleHeight(80),
    marginTop: statusBarHeight,
    paddingHorizontal: scaleWidth(20),
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "#a0a0a0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
  },
  headerText: {
    color: "black",
    fontSize: scaleWidth(18),
    fontFamily: "semiBold",
    marginLeft: scaleWidth(10),
  },
});

export default mainStyles;
