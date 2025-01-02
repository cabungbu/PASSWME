import { StyleSheet } from "react-native";
//custom
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    width: "100%",
    height: scaleHeight(160),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: scaleHeight(15),
    paddingHorizontal: scaleWidth(20),
    // overflow: 'hidden',
  },
  PWMBackground: {
    width: "50%",
    height: scaleHeight(160),
    resizeMode: "cover",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scaleHeight(10),
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1 ,
    height: scaleHeight(150)
  },
  headerText: {
    color: COLOR.mainColor,
    fontSize: 18,
    fontFamily: "bold",
  },
  followsText: {
    marginTop: scaleHeight(10),
    color: "black",
    fontSize: 12,
    fontFamily: "regular",
  },
  numberOfNoti: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: COLOR.disableWhiteColor,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -7,
    marginTop: -7,
  },

  //Text
  subtitleText: {
    fontSize: 15,
    fontFamily: "semiBold",
    color: "black",
  },

  menuContainer: {
    position: "absolute",
    width: scaleWidth(200),
    top: 30,
    right: 0,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  menuOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: "#CFCFCF",
  },
  textInfor: {
    fontFamily: "regular",
    fontSize: 13,
    color: "black",
    width: "50%",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeModelButton: {},
  imageModel: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  inforDetail: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 15,
    padding: scaleWidth(15),
  },
});

export default styles;
