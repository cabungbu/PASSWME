import {
  View,
  Text,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import styles from "./style";
import OrderCard from "../../../components/orderCard";

const PendingOrder = React.memo(
  ({ orders }) => {
    console.log("PendingOrder");
    const getPendingOrders = (orders) => {
      return orders.filter((order) => order.status === "pending");
    };

    return (
      <View style={{ flex: 1 }}>
        {orders.length > 0 ? (
          <FlatList
            data={getPendingOrders(orders)}
            showsVerticalScrollIndicator={false}
            // style={styles.Wrapper}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => <OrderCard order={item} />}
          />
        ) : (
          <Text>Bạn chưa có đơn hàng nào</Text>
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function to prevent unnecessary re-renders
    return prevProps.posts === nextProps.posts;
  }
);

export default PendingOrder;
