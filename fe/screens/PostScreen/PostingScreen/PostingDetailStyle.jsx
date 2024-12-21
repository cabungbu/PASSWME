import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { COLOR } from "../../../assets/constant/color";

const statusBarHeight = (StatusBar.currentHeight || 30) - 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  headerText: {
    color: "#fff",
    marginTop: statusBarHeight,
    flex: 1,
    fontSize: 20,
    fontFamily: "semiBold",
    textAlign: "center",
  },
  header: {
    backgroundColor: COLOR.mainColor,
    height: scaleHeight(80) + statusBarHeight,
    paddingTop: statusBarHeight,
    paddingHorizontal: scaleWidth(20),
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    marginBottom: scaleHeight(2),
  },
  content: {
    padding: scaleWidth(15),
  },
  section_label: {
    backgroundColor: "#FFDDDF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: scaleWidth(10),
    marginTop: scaleHeight(15)    
  },
  section_textLabel: {
    fontFamily: 'medium',
    fontSize: 15
  },
  section_container: {
    backgroundColor: "white",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: scaleWidth(15),
    paddingBottom: scaleHeight(25)
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: scaleHeight(10)
  },
  imgPicker: {
    backgroundColor: "#F4F4F4",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLOR.mainColor,
    alignItems: "center",
    borderRadius: 10,
    padding: scaleWidth(10),
  },
  imgPicker_text: {
    fontSize: 12,
  },
  border_imgIcon: {
    height: scaleHeight(60),
    width: scaleWidth(50),
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  delete_imgAndVideo: {
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 100,
  },
  inputContainer: {
    paddingVertical: scaleHeight(5),
    borderWidth: 1,
    borderColor: "#a0a0a0",
    marginTop: scaleWidth(5),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  editAddressIcon: {
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(5),
    borderLeftWidth: 1,
    borderLeftColor: "#a0a0a0",
  },

  label: {
    fontSize: 14,
    fontFamily: "regular",
    marginTop: scaleHeight(10)
  },
  textInput: {
    marginLeft: scaleWidth(15),
    fontFamily: "regular",
    flex: 1,
  },
  price: {
    color: COLOR.mainColor,
    fontSize: 14,
    fontFamily: "medium"
  },
  linkText: {
    fontSize: 12,
    fontFamily: "regular",
    color: 'blue',
    textDecorationLine: 'underline', // Tạo hiệu ứng đường gạch chân
  },
});

export default styles;
