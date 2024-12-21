import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "../../assets/constant/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(10),
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    padding: scaleWidth(10),
  },
  modalText: {
    fontSize: 13,
    fontFamily: "medium",
    textAlign: "center",
    marginBottom: scaleWidth(10),
  },
  Dong: {
    paddingTop: scaleWidth(10),
    fontSize: 13,
    fontFamily: "medium",
    textAlign: "center",
    color: "#E30414",
    width: "100%",
    borderTopColor: "#A0A0A0",
    borderTopWidth: 1,
  },
});

export default styles;
