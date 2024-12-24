import { StyleSheet } from "react-native";
import { COLOR } from "../../assets/constant/color";
import { scaleWidth } from "../../assets/constant/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
    paddingHorizontal: scaleWidth(15),
  },

  headerIOS: {
    backgroundColor: "#E30414",
    display: "flex",
    paddingBottom: 20,
    paddingTop: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  iconHeaderIOS: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  headerText: {
    fontSize: 15,
    fontFamily: "semiBold",
    color: "white",
  },
  login: {
    backgroundColor: "#E30414",
    padding: 10,
    borderRadius: 30,
    width: "80%",
    marginTop: 10,
    marginBottom: 20,
  },
  logintext: {
    textAlign: "center",
    fontFamily: "medium",
    fontSize: 16,
    color: "#fff",
  },
  please: {
    textAlign: "left",
    fontFamily: "semiBold",
    fontSize: 14,
    color: "#000",
    marginVertical: 20,
    textAlign: "center",
  },
  error: {
    textAlign: "left",
    fontFamily: "regular",
    fontSize: 12,
    color: COLOR.mainColor,
    marginBottom: 5,
    width: "80%",
  },
});

export default styles;
