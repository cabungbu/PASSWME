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
    marginHorizontal: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    top: -10,
    minHeight: 45,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  categoryContainer: {
    backgroundColor: "#E30414",
  },
  coinText: {
    fontFamily: "regular",
    color: "#737373",
    fontSize: 13,
  },
  coin: {
    fontFamily: "semibold",
    fontSize: 15,
    marginLeft: 5,
  },
  categoryText: {
    color: "#ffffff",
    fontSize: 10,
    fontFamily: "regular",
    textAlign: "center",
  },
  categoriesContainer: {
    paddingTop: 10,
    paddingLeft: 15,
  },
  textSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  viewAll: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  maybeYouLike: {
    color: "#E30414",
    fontSize: 13,
    fontFamily: "bold",
  },
  viewAllText: {
    color: "#E30414",
    fontSize: 12,
    fontFamily: "semibold",
    marginRight: 5,
  },
  scrollContainer: {
    paddingLeft: 15,
  },
  redBanner: {
    width: "100%",
    height: 25,
    marginTop: 10,
    backgroundColor: "#E30414",
  },
});

export default styles;
