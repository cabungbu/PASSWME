import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,

    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "medium",
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

    marginBottom: 25,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    fontFamily: "medium",
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
    fontWeight: "light",
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
    fontWeight: "500",
  },
  image: {
    width: 24,
    height: 24,
    marginLeft: 10,
    resizeMode: "contain",
    marginRight: 15,
  },
});

export default styles;
