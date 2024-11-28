import React from 'react'
import {
    View,
    Text,
    StyleSheet,
  } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { COLOR } from '../assets/constant/color';

const ShoppingCartIcon = ({cartColor ="white"}) => {
  return (
    <View style={{flexDirection:"row", }}>
        <Feather name="shopping-cart" size={24} color={cartColor} />
        <View style={styles.numberOfNoti}>
            <Text style={{fontFamily: "medium"}}>5</Text>
        </View>
    </View>
  )
}

export const styles = StyleSheet.create({
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
})

export default  ShoppingCartIcon;