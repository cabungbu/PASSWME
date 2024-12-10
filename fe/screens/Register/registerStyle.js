import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";

const statusBarHeight = (StatusBar.currentHeight || 30) - 15;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    color: "#fff",
    marginTop: statusBarHeight,
    fontSize: 20,
    fontFamily: "semiBold",
    flex: 1,
    marginRight: scaleWidth(24),
    textAlign: "center"
  },
  headerIcon: {
    marginTop: statusBarHeight,
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

  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(50),
    flexGrow: 1,
  },
  input: {
    fontFamily: "regular",
  },
  register: {
    color: "#961515",
    fontWeight: "medium",
    fontSize: 14,
  },
  forgot: {
    color: "#0092E7",
    fontWeight: "medium",
    fontSize: 14,
  },
  login: {
    backgroundColor: "#E30414",
    padding: 10,
    borderRadius: 30,
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
  logintext: {
    textAlign: "center",
    fontFamily: "semiBold",
    fontSize: 16,
    color: "#fff",
  },
  greyline: {
    backgroundColor: "#777777",
    height: 1,
    flex: 1,
  },
  or: {
    marginHorizontal: 10,
    color: "#777777",
    fontSize: 14,
    fontFamily: "regular",
    marginVertical: scaleHeight(20)
  },
  ggfbcontainer: {
    width: "80%",
    marginBottom: scaleHeight(20),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#777777",
    borderWidth: 1,
    padding: scaleWidth(10),
    borderRadius: 20,
  },
  ggfbtext: {
    marginLeft: scaleWidth(40),
    fontSize: 14,
    fontFamily: "semiBold",
  },
  CheckBoxText: {
    flex: 1,
    fontFamily: "regular",
    color: "#737373",
    fontSize: 12,
  },
  DacoTK: {
    fontFamily: "regular",
    color: "#737373",
    fontSize: 12,
  },
  loginSmallText: {
    fontFamily: "bold",
    color: "#E30414",
    fontSize: 14,
  },
});

export default styles;
