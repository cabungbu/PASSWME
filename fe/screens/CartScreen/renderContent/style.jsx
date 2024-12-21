import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { COLOR } from "../../../assets/constant/color";
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    marginHorizontal: scaleWidth(10),
    marginBottom: scaleHeight(10),
    paddingVertical: scaleWidth(10),
    borderRadius: scaleWidth(10),
  },
  shopNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(5),
  },
  shopNameText: {
    fontFamily: "regular",
    fontSize: 13,
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
    fontSize: 13,
  },
  name: {
    fontFamily: "regular",
    fontSize: 13,
    color: "#A0A0A0",
    flex: 1,
  },
  price: {
    textAlign: "right",
    width: "100%",
    color: COLOR.mainColor,
    fontSize: 13,
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
    fontSize: 13,
    color: "black",
    // paddingVertical: scaleWidth(5),
  },
  text: {
    fontFamily: "regular",
    fontSize: 13,
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
    fontSize: 13,
    color: "black",
  },
  dropdownItemTxtStyle: {
    marginHorizontal: scaleWidth(5),
  },
  dropdownMenuStyle: {
    marginTop: scaleWidth(5),
    borderRadius: 10,
  },
});

export default styles;
