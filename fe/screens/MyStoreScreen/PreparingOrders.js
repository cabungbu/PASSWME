import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import styles from "./style";
import OrderCardSeller from "../../components/OrderCard/orderCardSeller";

const PreparingOrders = React.memo(
  ({ orders, onDelivering }) => {
    console.log("PreparingOrder");
    const getPendingOrders = (orders) => {
      return orders.filter((order) => order.status === "preparing");
    };
    const handleOrderDelivery = (order) => {
      onDelivering(order); // Gọi callback và truyền order lên cha
    };

    return (
      <View style={{ flex: 1 }}>
        {getPendingOrders(orders).length > 0 ? (
          <FlatList
            data={getPendingOrders(orders)}
            showsVerticalScrollIndicator={false}
            // style={styles.Wrapper}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <OrderCardSeller
                order={item}
                onDelivering={() => handleOrderDelivery(item)}
              />
            )}
          />
        ) : (
          <View>
            <Text style={{ textAlign: "center", marginTop: 50 }}>
              Bạn chưa có đơn hàng nào
            </Text>
          </View>
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function to prevent unnecessary re-renders
    return prevProps.posts === nextProps.posts;
  }
);

export default PreparingOrders;
