import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { COLOR } from "../../../assets/constant/color";
const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: scaleWidth(10),
    paddingBottom: scaleHeight(10),
    paddingVertical: scaleWidth(10),
    borderRadius: scaleWidth(10),
    backgroundColor: "white",
    marginTop: scaleHeight(10),
  },
  shopNameContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(5),
  },
  username: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    marginLeft: scaleWidth(15),
  },
  shopNameText: {
    fontFamily: "regular",
    fontSize: scaleWidth(13),
    color: "#949292",
    marginLeft: scaleWidth(5),
  },
  productContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scaleHeight(10),
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "medium",
    fontSize: scaleWidth(13),
  },
  name: {
    fontFamily: "regular",
    fontSize: scaleWidth(13),
    color: "#A0A0A0",
    flex: 1,
  },
  price: {
    textAlign: "right",
    width: "100%",
    color: COLOR.mainColor,
    fontSize: scaleWidth(13),
    fontFamily: "medium",
  },
  updateQuantity: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#bcbbbb",
    borderRadius: scaleWidth(5),
    alignItems: "center",
  },
  plus: {
    paddingHorizontal: scaleWidth(5),
    // paddingVertical: scaleWidth(5),
  },
  quantity: {
    paddingHorizontal: scaleWidth(5),
    borderLeftWidth: 1,
    borderColor: "#bcbbbb",
    borderRightWidth: 1,
    fontFamily: "medium",
    fontSize: scaleWidth(13),
    color: "black",
    // paddingVertical: scaleWidth(5),
  },
  text: {
    fontFamily: "regular",
    fontSize: scaleWidth(13),
    color: "black",
  },
  dropdownButtonStyle: {
    paddingHorizontal: scaleWidth(5),
    borderWidth: 1,
    borderColor: "#bcbbbb",
    borderRadius: scaleWidth(10),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff8f8",
    width: "50%",
  },
  dropdownItemStyle: {
    paddingHorizontal: scaleWidth(5),
    paddingVertical: scaleWidth(5),
    fontFamily: "regular",
    fontSize: scaleWidth(13),
    color: "black",
  },
  dropdownItemTxtStyle: {
    marginHorizontal: scaleWidth(5),
  },
  dropdownMenuStyle: {
    marginTop: scaleWidth(5),
    borderRadius: 10,
  },
  grayline: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: scaleHeight(10),
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
  },
  line: {
    borderBottomColor: COLOR.mainColor,
    borderBottomWidth: 1,
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(15),
    marginBottom: scaleHeight(15),
    fontFamily: "regular",
    fontSize: scaleWidth(13),
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
