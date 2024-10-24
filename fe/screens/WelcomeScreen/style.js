import { StyleSheet } from "react-native";

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
    fontWeight: "medium",
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
  },
});

export default styles;
