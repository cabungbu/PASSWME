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
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../../assets/constant/color";
import styles from "./style";
const OrderCard = React.memo(({ order, onDelete, onComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleDelete = () => {
    if (onDelete) {
      console.log("onDelte ");
      onDelete(order); // Truyền order lên PendingOrder
    }
  };
  const handleComplete = () => {
    onComplete(order);
  };
  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return (
          <TouchableOpacity
            style={styles.buttonHuy}
            onPress={() => handleDelete()}
          >
            <Text style={styles.huyText}>Hủy đơn</Text>
          </TouchableOpacity>
        );
      case "preparing":
        return <Text style={styles.huyText}>Đang chờ chuẩn bị hàng</Text>;
      case "delivering":
        return <Text style={styles.huyText}>Đang vận chuyển</Text>;
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
            <Text style={[styles.name, { flex: 1, fontSize: 11 }]}>
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
            <Text style={[styles.name, { flex: 1, fontSize: 11 }]}>
              Đơn hàng đang được giao đến bạn
            </Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleComplete()}
            >
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
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit", // Hiển thị ngày với 2 chữ số (ví dụ: "20")
      month: "2-digit", // Hiển thị tháng với 2 chữ số (ví dụ: "12")
      year: "numeric", // Hiển thị năm đầy đủ (ví dụ: "2024")
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
          <Text style={styles.buyerName}>{order.sellerName}</Text>
        </View>

        {renderStatus(order.status)}
      </View>

      <View style={{ paddingVertical: scaleHeight(10) }}>
        {itemDetail(order.items[0])}

        <View
          style={[
            styles.xemthem,
            { marginBottom: isExpanded ? scaleWidth(15) : 0 },
          ]}
        >
          <TouchableOpacity onPress={toggleExpand}>
            <Text
              style={[
                styles.name,
                { fontSize: 11, marginRight: scaleWidth(5) },
              ]}
            >
              {isExpanded ? "Thu gọn" : "Xem thêm sản phẩm"}
            </Text>
          </TouchableOpacity>
          <Ionicons
            name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
            size={20}
            color="#928E8E"
          />
        </View>

        {isExpanded &&
          order.items
            .slice(1)
            .map((item, index) => <View key={index}>{itemDetail(item)}</View>)}
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

      <View style={[styles.namngang, { alignItems: "flex-start" }]}>
        <View style={{ flex: 0.5 }}>
          <Text style={[styles.info, { marginBottom: scaleWidth(5) }]}>
            Ngày đặt hàng: {formattedDate(order.orderDate)}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: scaleWidth(10) }}>
          <Text style={[styles.info, { textAlign: "right" }]}>
            Người mua: {order.buyerName}
          </Text>
        </View>
      </View>
      <View style={[styles.namngang, { alignItems: "flex-start" }]}>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.info}>Số điện thoại: {order.buyerPhone}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: scaleWidth(10) }}>
          <Text style={[styles.info, { textAlign: "right" }]}>
            Địa chỉ: {order.buyerAddress}
          </Text>
        </View>
      </View>

      <View style={styles.line} />
      <Text style={[styles.info, { textAlign: "left" }]}>
        Ghi chú: {order.note}
      </Text>
      <View style={styles.line} />

      {renderFooter(order.status)}
    </View>
  );
});

export default OrderCard;
