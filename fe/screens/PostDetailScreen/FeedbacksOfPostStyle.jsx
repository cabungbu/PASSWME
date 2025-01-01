import { StyleSheet } from "react-native";
//custom
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";

const styles = StyleSheet.create({
  container: {},
  card: {
    backgroundColor: "white",
    padding: scaleWidth(15),
    marginBottom: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: scaleHeight(15),
  },
  buyerName: {
    fontSize: 16,
    fontWeight: "medium",
    color: "black",
  },
  grayText: {
    fontSize: 14,
    fontWeight: "regular",
    color: "#707070",
    marginBottom: scaleHeight(10) 
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    textAlign: "right",
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: scaleHeight(20),
  },
  avatar: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    resizeMode: "contain",
    borderRadius: 100,
  },
  productImage: {
    width: scaleWidth(90),
    height: scaleWidth(90),
    resizeMode: "contain",
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: scaleWidth(10),
  },
  title: {
    fontSize: 15,
    marginBottom: scaleHeight(5),
    fontFamily: "regular",
  },
  price: {
    fontSize: 15,
    fontFamily: "semiBold",
    color: COLOR.mainColor,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeModelButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  imageModel: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
});
export default styles;
