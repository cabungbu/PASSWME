import React from 'react'
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar
} from 'react-native';
import '../../styles/mainStyles'
import styles from '../../styles/mainStyles';
// import './CartScreen'

import Ionicons from '@expo/vector-icons/Ionicons';
import { COLOR } from '../../assets/constant/color';
import { scaleWidth } from '../../assets/constant/responsive';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
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
        <Text style={styles.headerText}>Giỏ hàng</Text>
      </View>
    </View>
  )
}
