import React from 'react'
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  Pressable, 
  useWindowDimensions 
} from 'react-native';

import { scaleHeight, scaleWidth } from '../assets/constant/responsive';

export default function ActiveListingCard() {
  return (
    <View style={styles.container_card}>
        <Text>Hello</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container_card: {
      width: "100%",
      height: scaleHeight(170),
      backgroundColor: "#FFFFFF",
      marginTop: scaleHeight(5)
    },
  });