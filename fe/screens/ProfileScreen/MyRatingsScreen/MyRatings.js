import React, { useState } from "react";
import { View, Text, StatusBar, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import mainStyles from "../../../styles/mainStyle";
import styles from "./MyRatingsStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";

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

  const renderScene = SceneMap({
    WithoutFeedback: OrdersWithoutFeedbackTab,
    Feedbacks: feedbackOrdersTab,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLOR.mainColor,
        height: scaleHeight(2),
        bottom: 0,
        borderRadius: 100,
      }}
      style={{
        backgroundColor: "#FFFFFF",
        outline: "none",
        padding: 0,
        position: "relative",
      }}
      renderLabel={({ route, focused }) => (
        <Pressable
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 12, //scale(15),
              fontFamily: "bold",
            }}
          >
            {route.title}
          </Text>
        </Pressable>
      )}
    />
  );

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
