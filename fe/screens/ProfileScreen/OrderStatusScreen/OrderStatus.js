import React, { useState } from 'react'
import {
  StatusBar,
  Text,
  View
} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import mainStyles from '../../../styles/mainStyles';

import Ionicons from '@expo/vector-icons/Ionicons';
import { COLOR } from '../../../assets/constant/color';
import { scaleWidth } from '../../../assets/constant/responsive';
import RenderTabBar from '../../../components/RenderTabBar';
import { useNavigation } from '@react-navigation/native';

const OrderStatus = ({route}) => {
  const { tab = 0 } = route.params || {};
  const navigation = useNavigation();

  const pendingOrdersTab = () => (
  <View style={{ flex: 1 }}>
      <Text>Chờ xác nhận</Text>
  </View>
);

const shippingOrdersTab = () => (
  <View style={{ flex: 1 }}>
      <Text>Chờ giao hàng</Text>
  </View>
);

const deliveryOrdersTab = () => (
    <View style={{ flex: 1 }}>
        <Text>Chờ nhận hàng</Text>
    </View>
);

  const [index, setIndex] = useState(tab);
  const [routes] = useState([
    { key: "pending", title: "Chờ xác nhận" },
    { key: "shipping", title: "Chờ giao hàng" },
    { key: "delivery", title: "Chờ nhận hàng" }
  ]);

  const renderTabBar = RenderTabBar();

  const renderScene = SceneMap({
    pending: pendingOrdersTab,
    shipping: shippingOrdersTab,
    delivery: deliveryOrdersTab
  });

  return (
    <View style={{flex: 1,
      backgroundColor: '#EFEFEF',}}>
      <StatusBar
        translucent={true}
        backgroundColor= "white"
        barStyle="dark-content"
      />
      <View style={mainStyles.headerContainer}>
        <Ionicons onPress={()=> {navigation.goBack()}} name="chevron-back" size={scaleWidth(30)} color={COLOR.mainColor} />
        <Text style={mainStyles.headerText}>{routes[index].title}</Text>
      </View>
      <TabView
        lazy 
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
    </View>
  )
}

export default OrderStatus