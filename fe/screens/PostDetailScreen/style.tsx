import { StyleSheet } from "react-native";
//custom
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },

  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    position: "absolute",
    zIndex: 1,
    width: "100%",
    marginTop: 50,
    paddingLeft: 15,
  },
  backText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imageCounter: {
    position: "absolute",
    zIndex: 1,
    bottom: 5,
    alignSelf: "flex-end",
    backgroundColor: "#828282",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 1,
    right: 5,
  },
  imageCounterText: {
    color: "#FFFFFF",
    fontFamily: "regular",
    fontSize: 12,
  },
  backIcon: {
    width: scaleWidth(24),
    height: scaleHeight(24),
    backgroundColor: "rgba(255, 255, 255, 0.64)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  numberOfNoti: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: COLOR.mainColor,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
    marginTop: -7,
  },
  cartIconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.disableWhiteColor,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  productCount: {
    fontFamily: "regular",
    fontSize: 12,
    color: "#828282",
    marginVertical: 10,
  },
  price: {
    fontFamily: "semibold",
    fontSize: 16,
    color: COLOR.mainColor,
  },
  locationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
  },
  location: {
    fontFamily: "regular",
    fontSize: 12,
    color: "#000",
    marginBottom: 10,
    marginLeft: 10,
  },
  phanCachXam: {
    width: "100%",
    height: 5,
    backgroundColor: "#EFEFEF",
  },
  ownerContainer: {
    paddingHorizontal: 15,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ownerName: {
    fontFamily: "semibold",
    fontSize: 16,
    color: COLOR.mainColor,
    marginVertical: 10,
  },
  follower: {
    fontFamily: "regular",
    fontSize: 13,
    color: "#828282",
    marginRight: 20,
  },
  ownerPost: {
    fontFamily: "regular",
    fontSize: 13,
    color: "#828282",
  },
  dataDescription: {
    paddingHorizontal: 15,
    backgroundColor: "white",
    paddingVertical: 10,
  },
  gachChanXam: {
    width: "100%",
    height: 2,
    backgroundColor: "#EFEFEF",
  },
  condition: {
    fontFamily: "semibold",
    fontSize: 13,
    color: COLOR.mainColor,
  },
  tinhTrangSanPham: {
    fontFamily: "regular",
    fontSize: 12,
    color: "#000",
  },
  in4SanPham: {
    fontFamily: "medium",
    fontSize: 13,
    color: "#000",
    marginVertical: 10,
  },
});
export default styles;
