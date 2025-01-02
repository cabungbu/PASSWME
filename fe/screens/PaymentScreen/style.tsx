import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  headerIOS: {
    backgroundColor: "#E30414",

    display: "flex",
    paddingBottom: 20,
    paddingTop: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  iconHeaderIOS: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "semiBold",
  },
  part1: {
    borderColor: "#A0A0A0",
    borderWidth: 1,
    borderRadius: 10,
    padding: scaleWidth(10),
    marginHorizontal: scaleWidth(15),
    marginTop: scaleHeight(20),
  },
  part2: {
    padding: scaleWidth(10),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: scaleHeight(15),
    marginTop: scaleHeight(10),
  },
  boldText: {
    fontFamily: "semiBold",
    color: "#333333",
  },
  time: {
    flex: 1,
    fontFamily: "semiBold",
    color: "#333333",
  },
  lightText: {
    fontFamily: "regular",
    color: "#333333",
  },

  onerow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(10),
  },
  price: {
    fontFamily: "semiBold",
    color: "#369C33",
  },
  buttonCtn: {
    marginTop: scaleHeight(20),
    marginHorizontal: scaleWidth(15),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.mainColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(20),
  },
  ToMomo: {
    color: COLOR.mainColor,
    fontSize: 14,
    fontFamily: "semiBold",
  },
});

export default styles;
