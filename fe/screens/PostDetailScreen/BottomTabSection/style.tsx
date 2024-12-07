import { StyleSheet } from "react-native";
import { COLOR } from "../../../assets/constant/color";
import { scaleHeight } from "../../../assets/constant/responsive";
import { scaleWidth } from "../../../assets/constant/responsive";
const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: COLOR.mainColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  chatAndAddContainer: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
  },
  chatContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    paddingVertical: scaleHeight(20),
  },
  line: {
    height: "60%",
    backgroundColor: "black",
    width: scaleWidth(2),
  },
  buyNowContainer: {
    backgroundColor: COLOR.mainColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    paddingVertical: scaleHeight(20),
    shadowColor: COLOR.mainColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    overflow: "hidden",
  },
  buyNowText: {
    color: "white",
    fontSize: scaleHeight(15),
    fontFamily: "semiBold",
  },
});
export default styles;
