import React from 'react'
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLOR } from '../../assets/constant/color';

export default function Home() {
  return (
    <LinearGradient 
      colors={COLOR.gradientColor} 
      start={[0, 0]}
      end={[1, 1]}
      location={[0.96, 0.99, 1]}>
      <View style={styles.container}>
        <Text style={{ fontFamily: "light", fontWeight: '300'}}>Chào! hehe nè</Text>
        <Text style={{ fontFamily: "bold", fontWeight: '900'}}>Chào! hehe nè</Text>
        <Text style={{ fontFamily: "semiBold", fontWeight: "600"}}>Chào! hehe nè</Text>
        <Text style={{ fontFamily: "black", fontWeight: "600"}}>Chào! hehe nè</Text>

      </View>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
});
