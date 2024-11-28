import { StyleSheet } from "react-native";
import BannerSection from "./bannerSection";

const styles = StyleSheet.create({
  bannerSection: {
    height: 200, // Adjust this value based on your needs
    width: "100%",
  },
  banner: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.77,
    position: "absolute",
    zIndex: 0,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  seachBarAndIcon: {
    marginTop: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "5%",
    fontWeight: "medium",
  },
  containerBadge: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "semibold",
  },
  coinContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "5%",
    backgroundColor: "white",
    top: -10,
  },
  categoryContainer: {
    backgroundColor: "#E30414",
  },
});

export default styles;
