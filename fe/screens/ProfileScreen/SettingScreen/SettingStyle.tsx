import { StyleSheet } from 'react-native';
//custom
import { scaleHeight, scaleWidth } from '../../../assets/constant/responsive';
import { COLOR } from '../../../assets/constant/color';

const styles = StyleSheet.create({
  optionsSetting: {
    marginVertical: scaleHeight(5),
    paddingHorizontal: scaleWidth(5),
    backgroundColor: 'white',
    borderRadius: 10
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center', 
    padding: scaleWidth(20), 
  },
  //Text
  settingOptionText: {
    color: "black",
    fontSize: 16,
    fontFamily: "medium",
    flex: 1,
    marginLeft: scaleWidth(10)
  },
  text: {
    fontSize: 18,
    fontFamily:'medium',
    color: 'black'
  },

  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "auto",
    padding: scaleHeight(20),
    position: "absolute",
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalHeader: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(30)
  },
  textInput: {
    width: "100%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
},
});


export default styles;