import { StyleSheet } from "react-native";
//custom
import { scaleHeight, scaleWidth } from '../../assets/constant/responsive';
import { COLOR } from '../../assets/constant/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  flatListContent: {
    paddingBottom: 90
  },


  header: {
    height: scaleHeight(160),
    flexDirection:'column',
    justifyContent: "space-between",
    paddingTop: scaleHeight(40),
    paddingBottom: scaleHeight(15),
    paddingHorizontal: scaleWidth(15),
  },
  buttonContainer: {
    alignSelf:"flex-end",
    flexDirection: "row",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "bold",
  },
  numberOfNoti: {
    width: 20,
    height: 20,
    borderRadius: 100, 
    backgroundColor: COLOR.disableWhiteColor,
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center',
    marginLeft: -10,
    marginTop: -7
  },

  //Order
  order: {
    marginTop: scaleHeight(10),
    height: scaleHeight(140),
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: scaleWidth(15)
  },
  iconTextPair: {
    alignItems:"center",
    marginVertical: scaleHeight(25)
  },
  orderText: {
    fontFamily: "regular",
    fontSize: 13,
    color: "black",
    marginTop: scaleHeight(2)
  },
  //Another blabla
  //Support

  //Text
  subtitleText: {
    fontSize: 20,
    fontFamily:"medium",
    color: "black"
  }
});


export default styles;