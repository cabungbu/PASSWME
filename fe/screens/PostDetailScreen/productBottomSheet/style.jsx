import { StyleSheet } from "react-native";
import { COLOR } from "../../../assets/constant/color";
import { scaleHeight } from "../../../assets/constant/responsive";
import { scaleWidth } from "../../../assets/constant/responsive";
const styles = StyleSheet.create({
  firstSection: {
    width: "100%",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(15),
  },
  priceContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: scaleHeight(10),
    paddingBottom: scaleHeight(5),
  },
  priceText: {
    fontSize: scaleWidth(15),
    color: COLOR.mainColor,
    fontFamily: "medium",
    marginBottom: scaleHeight(10),
  },
  quantityText: {
    fontSize: scaleWidth(13),
    color: "#A0A0A0",
    fontFamily: "regular",
  },
  close: {
    fontSize: scaleWidth(25),
    color: "#737373",
    fontFamily: "regular",
  },
  grayline: {
    width: "100%",
    height: scaleHeight(1),
    backgroundColor: "#e4e4e4",
    marginVertical: scaleHeight(10),
  },
  phanloai: {
    marginBottom: scaleHeight(20),
    marginTop: scaleHeight(10),
    marginHorizontal: scaleWidth(15),
    fontSize: scaleWidth(13),
    color: "black",
    fontFamily: "medium",
  },
  soluong: {
    fontSize: scaleWidth(13),
    color: "black",
    fontFamily: "medium",
  },
  selected: {
    backgroundColor: "fff",
    borderWidth: 1,
    borderColor: COLOR.mainColor,
    borderRadius: 5,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(5),
    marginLeft: scaleWidth(15),
  },
  notSelected: {
    backgroundColor: "#f7f5f5",
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(5),
    borderRadius: 5,
    marginLeft: scaleWidth(20),
  },
  grayline2: {
    width: "100%",
    height: scaleHeight(1),
    backgroundColor: "#e4e4e4",
    marginVertical: scaleHeight(20),
  },
  updateQuantity: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#dfdcdc",
    borderRadius: scaleWidth(5),
    alignItems: "center",
  },
  plus: {
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleWidth(5),
  },
  quantity: {
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleWidth(5),
    borderLeftWidth: 1,
    borderColor: "#dfdcdc",
    borderRightWidth: 1,
    fontFamily: "semiBold",
    fontSize: scaleWidth(13),
    color: COLOR.mainColor,
  },
  section3: {
    // paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(15),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grayline3: {
    width: "100%",
    height: scaleHeight(10),
    backgroundColor: "#ebeaea",
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(10),
  },
  button: {
    backgroundColor: COLOR.mainColor,
    borderRadius: scaleWidth(10),
    paddingHorizontal: scaleWidth(25),
    paddingVertical: scaleHeight(10),
    marginHorizontal: scaleHeight(15),
    marginBottom: scaleHeight(20),
  },
  addCartText: {
    fontFamily: "semiBold",
    fontSize: scaleWidth(15),
    color: "white",
    textAlign: "center",
  },
  bottom: {
    width: "100%",
    height: scaleHeight(10),
    backgroundColor: "#fff",
  },
});
export default styles;