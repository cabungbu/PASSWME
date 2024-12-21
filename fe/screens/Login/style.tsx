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
  inputContainer: {
    backgroundColor: "#F2F2F2",
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,

    marginBottom: 25,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    fontFamily: "medium",
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
    marginVertical: scaleHeight(20),
  },
  ggfbcontainer: {
    width: "80%",
    marginTop: scaleHeight(20),
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
});

export default styles;
