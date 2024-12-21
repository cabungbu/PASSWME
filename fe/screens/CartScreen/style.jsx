import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";

const statusBarHeight = StatusBar.currentHeight || 20;

const styles = StyleSheet.create({
  headerText: {
    color: "black",
    fontSize: 18,
    fontFamily: "semiBold",
    flex: 1,
    textAlign: "center",
    backgroundColor: "red",
  },
  headerAndroid: {
    backgroundColor: COLOR.mainColor,
    height: scaleHeight(80),
    marginTop: statusBarHeight,
    paddingHorizontal: scaleWidth(20),
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
  },
  headerIOS: {
    backgroundColor: "#fff",
    display: "flex",
    paddingBottom: 20,
    paddingTop: 50,
    paddingLeft: scaleWidth(10),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  headerTextIOS: {
    color: "black",
    fontSize: 18,
    fontFamily: "semiBold",
    flex: 1,
    textAlign: "center",
  },
  iconHeaderIOS: {
    left: scaleWidth(15),
  },
  sua: {
    fontSize: 13,
    color: "black",
    marginRight: scaleWidth(15),
    fontFamily: "regular",
  },
});
export default styles;
