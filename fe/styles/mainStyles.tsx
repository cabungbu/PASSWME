import { StatusBar, StyleSheet } from "react-native";
import { COLOR } from "../assets/constant/color";
import { scaleHeight, scaleWidth } from "../assets/constant/responsive";

const statusBarHeight = (StatusBar.currentHeight || 30) - 15;

const mainStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    height: scaleHeight(80) + statusBarHeight,
    paddingTop: statusBarHeight,
    paddingHorizontal: scaleWidth(20),
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
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
    fontSize: 18,
    fontFamily: "semiBold",
    marginLeft: scaleWidth(10),
  },
  headerCenterContainer: {
    backgroundColor: COLOR.mainColor,
    height: scaleHeight(80) + statusBarHeight,
    paddingTop: statusBarHeight,
    paddingHorizontal: scaleWidth(20),
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    // marginBottom: scaleHeight(2),
  },
  headerCenterText: {
    color: "#fff",
    marginTop: statusBarHeight,
    flex: 1,
    fontSize: 20,
    fontFamily: "semiBold",
    textAlign: "center",
  },
  headerIcon: {
    marginTop: statusBarHeight,
  }
});

export default mainStyles;
