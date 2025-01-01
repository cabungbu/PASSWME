import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import mainStyles from "../../../styles/mainStyles";
import styles from "./MyRatingsStyle";

import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../../../assets/constant/color";
import { scaleWidth } from "../../../assets/constant/responsive";
import RenderTabBar from "../../../components/RenderTabBar";
import { useSelector } from "react-redux";
import OrderWithoutFeedbackCard from "../../../components/OrderWithoutFeedbackCard";
import { BE_ENDPOINT } from "../../../settings/localVars";
import Buyer_FeedbackGivenCard from "../../../components/Buyer_FeedbackGivenCard";

const MyRatings = () => {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFinishedOrder = () => {
      setLoading(true);
      fetch(BE_ENDPOINT + `/order/soldOrders/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };
    fetchFinishedOrder();
  }, []);

  useEffect(() => {
    const fetchAllFeedbacks = () => {
      setLoading(true);
      fetch(BE_ENDPOINT + `/feedback/getUserFeedbacks/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setFeedbacks(data.feedbacks);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };
    fetchAllFeedbacks();
  }, []);

  const OrdersWithoutFeedbackTab = React.useCallback(() => (
    <View style={{ flex: 1 }}>
      <OrderWithoutFeedbackCard orders={orders} />
    </View>
  ), [orders]);

  const FeedbackOrdersTab = React.useCallback(() => (
    <View style={{ flex: 1 }}>
      <Buyer_FeedbackGivenCard feedbacks={feedbacks}/>
    </View>
  ), [feedbacks]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Chưa đánh giá' },
    { key: 'second', title: 'Đã đánh giá' },
  ]);

  const renderTabBar = RenderTabBar({ scroll: false });

  const renderScene = React.useCallback(({ route }) => {
    switch (route.key) {
      case 'first':
        return <OrdersWithoutFeedbackTab />;
      case 'second':
        return <FeedbackOrdersTab />;
      default:
        return null;
    }
  }, [orders, feedbacks]);

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
