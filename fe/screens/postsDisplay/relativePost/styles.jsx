import { StyleSheet } from "react-native";
//custom
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { COLOR } from "../../../assets/constant/color";

const styles = StyleSheet.create({
  Wrapper: {
    paddingVertical: scaleHeight(10),
  },
  column: {
    justifyContent: "space-evenly",
  },
  row: {
    backgroundColor: "red",
  },
  container: {
    paddingVertical: scaleHeight(2),
  },
  containerLast: {
    width: "100%",
    paddingLeft: scaleWidth(7),
  },
  margin: {
    height: scaleHeight(10),
    width: "40%",
    backgroundColor: "red",
  },
  text: {
    fontSize: scaleWidth(16),
    fontFamily: "semiBold",
    color: "#b1b0b0",
    textAlign: "center",
    marginTop: scaleHeight(20),
  },
});

export default styles;
