import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";
const styles = StyleSheet.create({
  cartContainer: {
    backgroundColor: "white",
    marginHorizontal: scaleWidth(10),
    padding: scaleWidth(15),
    borderRadius: scaleWidth(10),
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.1,
    marginTop: scaleWidth(15),
  },
  namngang: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xemthem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleHeight(15),
  },
  buyerName: {
    marginLeft: scaleWidth(5),
    fontFamily: "medium",
    fontSize: 14,
  },
  buttonHuy: {
    borderColor: COLOR.mainColor,
    borderWidth: 1,
    borderRadius: scaleWidth(10),
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleWidth(5),
  },
  huyText: {
    fontFamily: "regular",
    fontSize: 13,
    color: COLOR.mainColor,
  },
  line: {
    borderWidth: 1,
    borderColor: "#f4f1f1",
    width: "100%",
    marginVertical: scaleWidth(10),
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: 13,
    fontFamily: "regular",
    color: "#4F4F4F",
  },
  name: {
    fontSize: 13,
    fontFamily: "regular",
    color: "#928E8E",
  },
  price: {
    fontSize: 13,
    fontFamily: "medium",
    color: COLOR.mainColor,
  },
  quantity: {
    fontSize: 13,
    fontFamily: "regular",
    color: "#4f4f4f",
  },
  buttonContainer: {
    borderColor: COLOR.mainColor,
    borderWidth: 1,
    borderRadius: scaleWidth(10),
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleWidth(10),
    backgroundColor: COLOR.mainColor,
    marginLeft: scaleWidth(10),
  },
  buttonContainer2: {
    borderColor: COLOR.mainColor,
    borderWidth: 1,
    borderRadius: scaleWidth(10),
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleWidth(10),
    backgroundColor: COLOR.mainColor,
  },
  logintext: {
    fontFamily: "semiBold",
    fontSize: 13,
    color: "white",
  },
  info: {
    fontSize: 11,
    fontFamily: "regular",
    color: "#928E8E",
  },
});

export default styles;
