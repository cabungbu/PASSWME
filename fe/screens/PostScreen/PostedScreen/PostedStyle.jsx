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
    width: '100%',
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
    width: '100%',
    // height: scaleHeight(100),
    borderTopWidth: 1,
    borderColor: COLOR.mainColor,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(30),
    position: 'absolute',
    bottom: 0
  }
});

export default styles;
