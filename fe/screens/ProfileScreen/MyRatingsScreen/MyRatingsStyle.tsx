import { StatusBar, StyleSheet } from "react-native";

import { COLOR } from "../../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
const statusBarHeight = StatusBar.currentHeight ||20

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%", 
        backgroundColor: "#EFEFEF",
    }
})
export default styles;