import { StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,

    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "bold",
  },
  header: {
    backgroundColor: "#E30414",
    display: "flex",
    paddingVertical: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
  iconHeader: {
    position: "absolute",
    left: 20,
  },
  inputContainer: {
    backgroundColor: "#F2F2F2",
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,

    marginBottom: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontFamily: "regular",
  },
  register: {
    color: "#961515",
    fontWeight: "medium",
    fontSize: 14,
  },
  forgot: {
    color: "#0092E7",
    fontWeight: "medium",
    fontSize: 14,
  },
  login: {
    backgroundColor: "#E30414",
    padding: 10,
    borderRadius: 30,
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
  logintext: {
    textAlign: "center",
    fontFamily: "semiBold",
    fontSize: 16,
    color: "#fff",
  },
  greyline: {
    backgroundColor: "#777777",
    height: 1,
    flex: 1,
  },
  or: {
    marginHorizontal: 10,
    color: "#777777",
    fontSize: 14,
    fontFamily: "regular",
  },
  ggfbcontainer: {
    width: "80%",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#777777",
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  ggfbtext: {
    fontSize: 14,
    fontFamily: "semiBold",
  },
  image: {
    width: 24,
    height: 24,
    marginLeft: 10,
    resizeMode: "contain",
    marginRight: 15,
  },
  CheckBoxText: {
    flex: 1,
    fontFamily: "regular",
    color: "#737373",
    fontSize: 12,
  },
  DacoTK: {
    fontFamily: "regular",
    color: "#737373",
    fontSize: 12,
  },
  loginSmallText: {
    fontFamily: "bold",
    color: "#E30414",
    fontSize: 14,
  },
});

export default styles;
