import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";

const statusBarHeight = (StatusBar.currentHeight || 30) - 15;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  ortherUserName: {
    color: "black",
    marginTop: statusBarHeight,
    fontSize: 16,
    fontFamily: "semiBold",
  },
  header: {
    backgroundColor: "white",
    height: scaleHeight(80) + statusBarHeight,
    paddingTop: statusBarHeight,
    paddingHorizontal: scaleWidth(20),
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    marginBottom: scaleHeight(2),
  },
  label: {
    color: "black",
    fontSize: 16,
    fontFamily: "medium",
    padding: scaleHeight(10),
  },
  headerIcon: {
    marginTop: statusBarHeight,
  },
  avatar: {
    width: scaleHeight(50),
    height: scaleHeight(50),
    borderRadius: 100,
    marginTop: statusBarHeight,
    marginHorizontal: scaleWidth(10),
  },
  messageList: {
    padding: scaleWidth(10),
  },

  messageContainer: {
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(10),
    borderRadius: 20,
    alignSelf: "flex-start", 
  },
  messageText: {
    fontSize: 16,
    fontFamily: "regular",
    color: "white",
  },
  inputContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: scaleWidth(10),
    borderTopWidth: 1,
    borderColor: "#ddd",
    maxHeight: scaleHeight(160),
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: scaleWidth(10),
    marginHorizontal: scaleWidth(10),
  },
  senderContainer: {
    alignSelf: "flex-end",
    marginVertical: scaleHeight(2),
    // marginLeft: '20%',
  },
  receiverContainer: {
    alignSelf: "flex-start",
    marginRight: '20%',
    marginVertical: scaleHeight(2),
  },
  messageTime: {
    fontSize: 10,
    fontFamily: "regular",
    color: "#888",
  },
  delete_imgAndVideo: {
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 100,
    margin: 1,
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
    width: '90%',
    height: '70%',
    resizeMode: "contain",
  },

});

export default styles;
