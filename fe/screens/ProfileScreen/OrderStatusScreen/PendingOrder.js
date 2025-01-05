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
import OrderCard from "../../../components/OrderCard/orderCard";

const PendingOrder = React.memo(
  ({ orders, onOrderDelete }) => {
    console.log("PendingOrder");

    const getPendingOrders = (orders) => {
      return orders?.filter((order) => order.status === "pending");
    };
    const handleOrderDelete = (order) => {
      // In ra thông tin order để debug
      if (onOrderDelete) {
        console.log("Delete order:", order.id);
        onOrderDelete(order); // Gọi callback và truyền order lên cha
      }
    };

    return (
      <View style={{ flex: 1 }}>
        {(orders && getPendingOrders(orders).length > 0) ? (
          <FlatList
            data={getPendingOrders(orders)}
            showsVerticalScrollIndicator={false}
            // style={styles.Wrapper}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <OrderCard
                order={item}
                onDelete={() => handleOrderDelete(item)}
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

export default PendingOrder;
