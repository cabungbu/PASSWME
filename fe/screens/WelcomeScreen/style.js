import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: "#E30414",
    fontFamily: "bold"
  },
  login: {
    color: "#E30414",
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E30414",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
  },
  register: {
    color: "#fff",
    backgroundColor: "#E30414",
    borderRadius: 30,
    width: "70%",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "center",
  },
  image: {
    position: "absolute",
    bottom: 0, 
    width: scaleWidth(430),
    height: scaleHeight(230),
    resizeMode: 'contain',
  },
});

export default styles;
