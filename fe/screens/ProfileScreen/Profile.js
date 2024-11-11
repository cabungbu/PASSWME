import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//icons
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

//custom
import { scaleHeight, scaleWidth } from '../../assets/constant/responsive';
import { COLOR } from '../../assets/constant/color';
import axios from 'axios';

//style
import styles from './style';
import DeliveryTruckClockIcon from '../../assets/icons/DeliveryTruckClockIcon';
import ListStarLightIcon from '../../assets/icons/ListStarLightIcon';

export default function Profile() {
  const [profile, setProfile] = useState()

  useEffect(()=>{
    const fecthProfile = async()  => {
      try {
        const res = await axios.get("http://192.168.1.4:3000/user/getUserById/HYkk3YabohiBYvWu7LHk")
        const profileData = res.data;
        setProfile(profileData)
      } catch (error) {console.error("Lỗi gọi profile rồi bà cố ơi", error)}
    }
    fecthProfile()
  },[])
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor= "transparent"
        barStyle="light-content"
      />

      {/* header */}
      <LinearGradient 
      colors={COLOR.gradientColor} 
      start={[0, 0]}
      end={[1, 1]}
      location={[0.96, 0.99, 1]} style={{ borderBottomEndRadius: 10, borderBottomStartRadius: 10, overflow: 'hidden' }}>
        <View style={styles.header}>
          <View style={styles.buttonContainer}>
            <Ionicons name="settings-outline" size={24} color="white" style={{marginRight: scaleWidth(15)}}/>
            <View style={{flexDirection:"row", }}>
              <Feather name="shopping-cart" size={24} color="white" />
              <View style={styles.numberOfNoti}>
                <Text style={{fontFamily: "medium"}}>5</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection:"row", alignContent:"flex-end"}}>
            <View style={{flexDirection:"row", position:"relative", }}>
              {profile? (
              <Image source={{uri: profile.avatar}}
                style={{ width: scaleHeight(70), height: scaleHeight(70), borderRadius:100, resizeMode: "contain", }}/>)
              : (<ActivityIndicator size="large"/>)
            }
              <MaterialIcons name="edit" size={18} color="black" style={{ position:"absolute", backgroundColor:  COLOR.disableWhiteColor, borderRadius: 100, padding: 2, bottom:-5, right:-5}}/>
            </View>
            <View style={{ marginLeft: scaleWidth(20)}}>
              {profile? (<Text style={styles.headerText}>{profile.username}</Text>):(<Text></Text>)}
              <Text>Information</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    {/* order */}
      <View style={styles.order}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={styles.subtitleText}>Đơn mua</Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text color="#a0a0a0" fontFamily="regular">Xem lịch sử mua hàng</Text>
            <Ionicons name="chevron-forward-outline"  size={18} color="#a0a0a0"/>
          </View>
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <View style={styles.iconTextPair}>
            <MaterialCommunityIcons name="cart-check" size={24} color="black" />
            <Text style={styles.orderText}>Chờ xác nhận</Text>
          </View>
          <View style={styles.iconTextPair}>
            <DeliveryTruckClockIcon size={24} color="black"/>
            <Text style={styles.orderText}>Chờ giao hàng</Text>
          </View>
          <View style={styles.iconTextPair}>
            <MaterialCommunityIcons name="cube-send" size={24} color="black" />
            <Text style={styles.orderText}>Chờ lấy hàng</Text>
          </View>
          <View style={styles.iconTextPair}>
          <ListStarLightIcon size={24} color="black" />
            <Text style={styles.orderText}>Đánh giá</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
