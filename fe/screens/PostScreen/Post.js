import React, { useCallback, useRef } from 'react'
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

export default function Post() {
  const bottomSheetRef = useRef(null)
  
  const onPress =useCallback(() =>{
    const isActive = bottomSheetRef?.current?.isActive()
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0)
    } else {
      bottomSheetRef?.current?.scrollTo(-200)
    }
  }, [])
  return (
    <GestureHandlerRootView>
      <View>
        <TouchableOpacity style={{width: 50, height:  50, backgroundColor: "red"}}
        onPress={onPress}/>
        <BottomSheet ref={bottomSheetRef}>
          <View>
            <Text>hei</Text>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  )
}
