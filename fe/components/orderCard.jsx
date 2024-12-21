import React, { useState, useMemo } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { scaleHeight, scaleWidth } from "../assets/constant/responsive";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../assets/constant/color";

const OrderCard = React.memo(({ order }) => {
  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return (
          <TouchableOpacity style={styles.buttonHuy}>
            <Text style={styles.huyText}>Hủy đơn</Text>
          </TouchableOpacity>
        );
      case "preparing":
        return <Text>Đang chờ chuẩn bị hàng</Text>;
      case "delivering":
        return <Text>Đang vận chuyển</Text>;
      default:
        return "Trạng thái không xác định";
    }
  };

  const renderFooter = (status) => {
    switch (status) {
      case "pending":
        return (
          <View style={styles.namngang}>
            <Text style={[styles.name, { flex: 1, fontSize: 11 }]}>
              Đơn hàng đang được người bán kiểm tra và xác nhận
            </Text>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.logintext}>Liên hệ người bán</Text>
            </TouchableOpacity>
          </View>
        );
      case "preparing":
        return (
          <View style={styles.namngang}>
            <Text style={styles.name}>
              Đơn hàng đang được người bán chuẩn bị gửi cho đơn vị vận chuyển
            </Text>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.logintext}>Liên hệ người bán</Text>
            </TouchableOpacity>
          </View>
        );
      case "delivering":
        return (
          <View style={styles.namngang}>
            <Text style={styles.name}>Đơn hàng đang được giao đến bạn</Text>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.logintext}>Đã nhận hàng</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return "Trạng thái không xác định";
    }
  };
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleString("vi-VN", {
      year: "numeric", // Hiển thị năm đầy đủ (ví dụ: "2024")
      month: "long", // Hiển thị tên tháng đầy đủ (ví dụ: "Tháng mười hai")
      day: "numeric", // Hiển thị ngày trong tháng (ví dụ: "20")
      hour: "numeric", // Hiển thị giờ (ví dụ: "16")
      minute: "numeric", // Hiển thị phút (ví dụ: "11")
      second: "numeric", // Hiển thị giây (ví dụ: "20")})
    });
  };
  const itemDetail = (item) => {
    return (
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100, borderRadius: 20 }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            marginLeft: 10,
          }}
        >
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Text style={[styles.price, { fontSize: 12 }]}>
              đ {formatPrice(item.price)}
            </Text>
            <Text style={styles.quantity}>x{item.quantity}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.cartContainer}>
      <View style={styles.namngang}>
        <View style={styles.namngang}>
          <Ionicons
            name="storefront-outline"
            size={20}
            color={COLOR.mainColor}
          />
          <Text style={styles.buyerName}>{order.buyerName}</Text>
        </View>

        {renderStatus(order.status)}
      </View>

      {itemDetail(order.items[0])}

      <View style={styles.xemthem}>
        <Text
          style={[styles.name, { fontSize: 11, marginRight: scaleWidth(5) }]}
        >
          Xem thêm sản phẩm
        </Text>
        <Ionicons name="chevron-down-outline" size={20} color="#928E8E" />
      </View>

      <View style={styles.namngang}>
        <Text style={styles.quantity}>{order.items.length} sản phẩm</Text>
        <View style={styles.namngang}>
          <Text style={styles.title}>Thành tiền:</Text>
          <Text> </Text>
          <Text style={styles.price}>đ {formatPrice(order.totalPrice)}</Text>
        </View>
      </View>

      <View style={styles.line} />
      <View style={[styles.namngang, { marginBottom: scaleHeight(5) }]}>
        <Text style={styles.name}>Mã đơn hàng:</Text>
        <Text> </Text>
        <Text style={styles.quantity}>{order.id}</Text>
      </View>

      <View style={[styles.namngang, { marginBottom: scaleHeight(5) }]}>
        <Text style={styles.name}>Ngày đặt:</Text>
        <Text> </Text>
        <Text style={styles.quantity}>{formattedDate(order.orderDate)}</Text>
      </View>

      <View style={[styles.namngang, { marginBottom: scaleHeight(5) }]}>
        <Text style={styles.name}>Số điện thoại đặt hàng:</Text>
        <Text> </Text>
        <Text style={styles.quantity}>{order.buyerPhone}</Text>
      </View>

      <View style={[styles.namngang, { marginBottom: scaleHeight(5) }]}>
        <Text style={styles.name}>Địa chỉ nhận hàng: {order.buyerAddress}</Text>
      </View>
      <View style={styles.line} />
      {renderFooter(order.status)}
    </View>
  );
});

export default OrderCard;

const styles = StyleSheet.create({
  cartContainer: {
    backgroundColor: "white",
    marginHorizontal: scaleWidth(15),
    padding: scaleWidth(15),
    borderRadius: scaleWidth(10),
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.2,
    marginTop: scaleWidth(10),
  },
  namngang: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xemthem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: scaleHeight(15),
  },
  buyerName: {
    marginLeft: scaleWidth(5),
    fontFamily: "medium",
    fontSize: 14,
  },
  buttonHuy: {
    borderColor: COLOR.mainColor,
    borderWidth: 1,
    borderRadius: scaleWidth(10),
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleWidth(5),
  },
  huyText: {
    fontFamily: "regular",
    fontSize: 13,
    color: COLOR.mainColor,
  },
  line: {
    borderWidth: 1,
    borderColor: "#f4f1f1",
    width: "100%",
    marginVertical: scaleWidth(10),
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: scaleWidth(15),
  },
  title: {
    fontSize: 13,
    fontFamily: "regular",
    color: "#4F4F4F",
  },
  name: {
    fontSize: 13,
    fontFamily: "regular",
    color: "#928E8E",
  },
  price: {
    fontSize: 13,
    fontFamily: "medium",
    color: COLOR.mainColor,
  },
  quantity: {
    fontSize: 13,
    fontFamily: "regular",
    color: "#4f4f4f",
  },
  buttonContainer: {
    borderColor: COLOR.mainColor,
    borderWidth: 1,
    borderRadius: scaleWidth(10),
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleWidth(10),
    backgroundColor: COLOR.mainColor,
    marginLeft: scaleWidth(10),
  },
  logintext: {
    fontFamily: "semiBold",
    fontSize: 13,
    color: "white",
  },
});
