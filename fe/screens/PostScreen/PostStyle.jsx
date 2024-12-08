import { StatusBar, StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";

const statusBarHeight = StatusBar.currentHeight ||20

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0e0e0',
    },
    headerText: {
      color: "#fff",
      flex: 1,
      fontSize: 20,
      fontFamily: "semiBold",
      textAlign: "center",
    },
    header: {
      backgroundColor: COLOR.mainColor,
      height: scaleHeight(80),
      marginTop: statusBarHeight,
      paddingHorizontal: scaleWidth(20),
      alignItems: "center",
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      flexDirection: "row",
      marginBottom: scaleHeight(2)
    },
})

export default styles