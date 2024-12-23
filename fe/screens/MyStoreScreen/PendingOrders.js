import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style";
import OrderCardSeller from "../../components/OrderCard/orderCardSeller";
import { useSelector } from "react-redux";
import { BE_ENDPOINT } from "../../settings/localVars";

const PendingOrders = React.memo(
  ({ onOrderDelete, onAccept }) => {
    const [orders, setOrders] = React.useState([]);
    const user = useSelector((state) => state.auth.user);
    const fetchOrder = () => {
      fetch(BE_ENDPOINT + `/order/getUserOrderReceived/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    };

    useEffect(() => {
      fetchOrder();
    }, []);

    const getPendingOrders = (orders) => {
      return orders.filter((order) => order.status === "pending");
    };
    const handleOrderDelete = (order) => {
      // In ra thông tin order để debug
      if (onOrderDelete) {
        console.log("Delete order:", order.id);
        onOrderDelete(order); // Gọi callback và truyền order lên cha
      }
    };
    const handleAccept = (order) => {
      console.log("Accept order:", order.id);
      onAccept(order);
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
                onDelete={() => handleOrderDelete(item)}
                onAccept={() => handleAccept(item)}
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

export default PendingOrders;
