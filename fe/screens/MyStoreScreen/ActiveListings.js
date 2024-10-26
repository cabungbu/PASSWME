import React from 'react'
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import ActiveListingCard from '../../components/ActiveListingCard';

export default function ActiveListings() {
  return (
    <View>
      <ActiveListingCard/>
    </View>
  )
}
