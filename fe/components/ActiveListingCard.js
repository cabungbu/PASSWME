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
  Image,
  useWindowDimensions 
} from 'react-native';

import { scaleHeight, scaleWidth } from '../assets/constant/responsive';

export default function ActiveListingCard({post}) {

  return (
    <View style={styles.container_card}>
      {post.image ? (
        <Image 
          source={{ uri: post.image }} 
          style={styles.image} 
        />
      ) : (
        <Text>No image available</Text>
      )}
      <Text>{post.title}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container_card: {
    width: "100%",
    height: scaleHeight(170),
    backgroundColor: "#FFFFFF",
    marginTop: scaleHeight(5),
    flex: 1,
    flexDirection: "row"
  },
  image: {
    width: scaleWidth(90),
    height: scaleWidth(90),
    resizeMode: "contain",
  },
});