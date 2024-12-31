import { StatusBar, StyleSheet } from "react-native";

import { COLOR } from "../../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: scaleWidth(15),
    flex: 1,
  },
  productImage: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    resizeMode: "contain",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleHeight(10),
  },
  imgPicker: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLOR.mainColor,
    alignItems: "center",
    borderRadius: 10,
    padding: scaleWidth(10),
    width: "48%",
  },
  border_imgIcon: {
    height: scaleHeight(60),
    width: scaleWidth(50),
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center", 
    marginRight: scaleWidth(10)
  },
  delete_imgAndVideo: {
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 100,
  },
  inputContainer: {
    padding: scaleHeight(5),
    borderWidth: 1,
    borderColor: "#a0a0a0",
    marginTop: scaleWidth(10),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    minHeight: scaleHeight(150),
  },
  buttonPosition: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: scaleHeight(30),
  },
  imgPicker_text: {
    fontSize: 12,
  },
  titleText: {
    fontSize: 15,
    fontFamily: "medium",
  },
  productName: {
    fontSize: 13,
    fontFamily: "regular",
    color: "#707070",
  },
  textInput: {
    fontFamily: "regular",
    alignSelf: "flex-start",
    fontSize: 14,
  },
});
export default styles;
