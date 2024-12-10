import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { COLOR } from "../../../assets/constant/color";

const statusBarHeight = (StatusBar.currentHeight || 30) - 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
  headerText: {
    color: "#fff",
    marginTop: statusBarHeight,
    flex: 1,
    fontSize: 20,
    fontFamily: "semiBold",
    textAlign: "center",
  },
  header: {
    backgroundColor: COLOR.mainColor,
    height: scaleHeight(80) + statusBarHeight,
    paddingTop: statusBarHeight,
    paddingHorizontal: scaleWidth(20),
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    marginBottom: scaleHeight(2),
  },
});

export default styles;
