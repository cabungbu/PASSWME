import React, { useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import mainStyle from '../../../styles/mainStyle';
import styles from './SettingStyle'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { COLOR } from '../../../assets/constant/color';
import { scaleWidth } from '../../../assets/constant/responsive';

import { useNavigation } from '@react-navigation/native';
import PasswordReset from '../../../assets/icons/PasswordReset';
import Feather from '@expo/vector-icons/Feather';
import ChangePassword from './ChangePassword';
import UpdateInformation from './UpdateInformation';

const Setting = () => {
  const [isModalVisible, setModalVisible] = useState([false, false, false]);
  const navigation = useNavigation();

  const toggleModalVisibility = (index) => {
    setModalVisible((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !prevVisibility[index];
      return updatedVisibility;
    });
  };

  return (
    <View style={{backgroundColor: '#EFEFEF'}}>
      <StatusBar
        translucent={true}
        backgroundColor= "white"
        barStyle="dark-content"
      />
      <View style={mainStyle.headerContainer}>
        <Ionicons onPress={()=> {navigation.goBack()}} name="chevron-back" size={scaleWidth(30)} color={COLOR.mainColor} />
        <Text style={mainStyle.headerText}>Cài đặt tài khoản</Text>
      </View>
      <View style={styles.optionsSetting}>        
        <TouchableOpacity style={styles.settingOption} onPress={() => toggleModalVisibility(0)}>
          <PasswordReset size={24}/>
          <Text style={styles.settingOptionText}>Cập nhật mật khẩu</Text>
        </TouchableOpacity>
        <ChangePassword 
          isModalVisible={isModalVisible[0]} 
          closeModal={() => toggleModalVisibility(0)} 
        />
        <TouchableOpacity style={styles.settingOption} onPress={() => toggleModalVisibility(1)}>
          <AntDesign name="retweet" size={24} color="black"/>
          <Text style={styles.settingOptionText}>Cập nhật thông tin cá nhân</Text>
        </TouchableOpacity>
        <UpdateInformation 
          isModalVisible={isModalVisible[1]} 
          closeModal={() => toggleModalVisibility(1)} 
        />
      </View>
      <View style={styles.optionsSetting}>        
        <TouchableOpacity style={styles.settingOption}>
          <Feather name="help-circle" size={24} color="black" />
          <Text style={styles.settingOptionText}>Kiểm tra bản cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Setting