import { StyleSheet } from "react-native";
//custom
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { COLOR } from "../../../assets/constant/color";

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: COLOR.mainColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: scaleHeight(5),
    paddingHorizontal: scaleWidth(10),
  },
  numberOfNoti: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -7,
    marginTop: -7,
  },
  inputContainer: {
    flex: 1,
    width: scaleWidth(300),
    marginHorizontal: scaleWidth(10),
    height: scaleHeight(50),
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: scaleWidth(20),
    display: "flex",
    flexDirection: "row",
  },
});

export default styles;
