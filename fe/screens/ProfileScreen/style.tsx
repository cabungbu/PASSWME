import { StyleSheet } from 'react-native';
//custom
import { scaleHeight, scaleWidth } from '../../assets/constant/responsive';
import { COLOR } from '../../assets/constant/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  header: {
    height: scaleHeight(160),
    flexDirection:'column',
    justifyContent: 'space-between',
    paddingTop: scaleHeight(40),
    paddingBottom: scaleHeight(15),
    paddingHorizontal: scaleWidth(15),
  },
  buttonContainer: {
    alignSelf:'flex-end',
    flexDirection: 'row',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'bold',
  },
  numberOfNoti: {
    width: 20,
    height: 20,
    borderRadius: 100, 
    backgroundColor: COLOR.disableWhiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
    marginTop: -7
  },

  //Order
  order: {
    marginTop: scaleHeight(10),
    height: 'auto',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: scaleWidth(15),
    paddingTop: scaleHeight(10),
    paddingBottom: scaleHeight(15),
    // display:'flex', 
    // flexDirection:'column',
    justifyContent:'space-between'
  },
  iconTextPair: {
    alignItems:'center',
    marginTop:  scaleHeight(25)
  },
  orderText: {
    fontFamily: 'regular',
    fontSize: 12,
    color: 'black',
    marginTop:  scaleHeight(5)
  },
  //Other Utilities
  otherUtilitiesContainer: {
    marginTop: scaleHeight(10),
    height: 'auto',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: scaleWidth(15),
    paddingTop: scaleHeight(10),
    paddingBottom: scaleHeight(15),
  },
  utilityItem: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  //Support
  supportIconTextPair: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#a0a0a0",
    borderRadius: 5,
    padding: scaleWidth(15)
  },
  supportText: {
    color: "black",
    fontSize: 14,
    fontFamily: "regular",
    flex: 1,
    marginLeft: scaleWidth(10)
  },
  //Text
  subtitleText: {
    fontSize: 18,
    fontFamily:'medium',
    color: 'black'
  }
});


export default styles;