import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { COLOR } from "../../../assets/constant/color";
const styles = StyleSheet.create({
  footerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  buyNowText: {
    color: "white",
    fontSize: 15,
    fontFamily: "semiBold",
  },
  allContainer: {
    backgroundColor: "white",
    paddingHorizontal: scaleWidth(10),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scaleHeight(20),
  },
  allText: {
    fontSize: 13,
    fontFamily: "medium",
  },
  payText: {
    fontSize: 13,
    fontFamily: "medium",
    marginBottom: scaleHeight(5),
  },
  payMoney: {
    color: COLOR.mainColor,
    fontSize: 13,
    fontFamily: "semiBold",
  },
  payContainer: {
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleWidth(20),
    backgroundColor: "white",
    flex: 1,
    display: "flex",
    alignItems: "flex-end", // Căn phải
    justifyContent: "center", // Căn giữa theo chiều dọc
  },
  button: {
    backgroundColor: COLOR.mainColor,
    justifyContent: "center",
    alignItems: "center",
    padding: scaleHeight(30),
  },

  footerDeleteContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(20),
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
  },
  buttonDelete: {
    borderWidth: 1,
    borderColor: COLOR.mainColor,
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(10),
    borderRadius: 10,
  },
  deleteText: {
    fontSize: 13,
    fontFamily: "medium",
    color: COLOR.mainColor,
  },
});

export default styles;
