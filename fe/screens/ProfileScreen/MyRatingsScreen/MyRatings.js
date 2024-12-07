import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StatusBar,
  Text,
  View
} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import mainStyles from '../../../styles/mainStyle';
import styles from './MyRatingsStyle';

import Ionicons from '@expo/vector-icons/Ionicons';
import { COLOR } from '../../../assets/constant/color';
import { scaleWidth } from '../../../assets/constant/responsive';
import RenderTabBar from '../../../components/RenderTabBar';

const MyRatings = () => {
  const navigation = useNavigation();

  const OrdersWithoutFeedbackTab = () => (
    <View style={{ flex: 1 }}>
      <Text>Chưa đánh giá</Text>
    </View>
  );

  const feedbackOrdersTab = () => (
    <View style={{ flex: 1 }}>
      <Text>Đã đánh giá</Text>
    </View>
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "WithoutFeedback", title: "Chưa đánh giá" },
    { key: "Feedbacks", title: "Đã đánh giá" },
  ]);

  const renderTabBar = RenderTabBar({scroll: false});

  const renderScene = SceneMap({
    WithoutFeedback: OrdersWithoutFeedbackTab,
    Feedbacks: feedbackOrdersTab,
  });

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="white"
        barStyle="dark-content"
      />
      <View style={mainStyles.headerContainer}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          name="chevron-back"
          size={scaleWidth(30)}
          color={COLOR.mainColor}
        />
        <Text style={mainStyles.headerText}>Đánh giá của tôi</Text>
      </View>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
    </View>
  );
};
export default MyRatings;
