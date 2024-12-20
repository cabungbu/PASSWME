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
});

export default styles;
