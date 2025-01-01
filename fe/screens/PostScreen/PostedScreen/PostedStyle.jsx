import { StatusBar, StyleSheet } from "react-native";
import { COLOR } from "../../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleWidth(15),
  },
  noti: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(179,218,178, 0.5)",
    padding: scaleHeight(10),
    borderRadius: 5,
    marginTop: scaleHeight(20),
  },
  noti_text: {
    fontFamily: "medium",
    fontSize: 16,
  },
  post: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scaleHeight(15),
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#a0a0a0",
    marginVertical: scaleHeight(20),
  },
  boldText: {
    fontFamily: "semiBold",
    fontSize: 15,
    color: "black",
    marginVertical: scaleHeight(1),
  },
  regularText: {
    fontFamily: "regular",
    fontSize: 13,
    color: "black",
    marginVertical: scaleHeight(1),
  },
  proposeNewArticle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scaleWidth(15),
    borderRadius: 10,
    marginTop: scaleHeight(25),
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
  },
  move: {
    width: "100%",
    // height: scaleHeight(100),
    borderTopWidth: 1,
    borderColor: COLOR.mainColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(30),
    position: "absolute",
    bottom: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: scaleWidth(20),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Optional: Set a width for the modal
  },
  modalText: {
    textAlign: "center",
    fontFamily: "medium",
  },
  line: {
    borderWidth: 1,
    borderColor: "#f4f1f1",
    width: "100%",
    marginTop: scaleWidth(20),
  },
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scaleWidth(20),
    borderRightColor: "#f4f1f1",
    borderRightWidth: 2,
  },
  yes: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scaleWidth(20),
  },
});

export default styles;
