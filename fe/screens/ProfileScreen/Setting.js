import React from 'react'
import {
  View,
  Text,
  StatusBar
} from 'react-native';
import styles from '../../styles/mainStyle';

import Ionicons from '@expo/vector-icons/Ionicons';
import { COLOR } from '../../assets/constant/color';
import { scaleWidth } from '../../assets/constant/responsive';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
    const navigation = useNavigation();
  return (
    <View>
      <StatusBar
        translucent={true}
        backgroundColor= "white"
        barStyle="dark-content"
      />
      <View style={styles.headerContainer}>
        <Ionicons onPress={()=> {navigation.goBack()}} name="chevron-back" size={scaleWidth(30)} color={COLOR.mainColor} />
        <Text style={styles.headerText}>Cài đặt tài khoản</Text>
      </View>
    </View>
  )
}

export default Setting