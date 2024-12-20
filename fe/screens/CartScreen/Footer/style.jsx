import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { COLOR } from "../../../assets/constant/color";
const styles = StyleSheet.create({
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
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
  chooseAll: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
  },
  modalView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    maxWidth: "80%",
  },
  line: {
    borderBottomColor: COLOR.mainColor,
    borderBottomWidth: 1,
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(15),
    marginBottom: scaleHeight(15),
    fontFamily: "regular",
    fontSize: scaleWidth(13),
    textAlign: "center",
  },
  buttonDong: {
    marginBottom: scaleHeight(15),
  },
  textButton: {
    color: COLOR.mainColor,
    fontFamily: "medium",
    fontSize: scaleWidth(15),
  },
});

export default styles;
