import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Text, TextInput, Switch, View, Image, StyleSheet } from "react-native"; // Các component UI của React Native
import { useSelector } from "react-redux";
import { scaleWidth, scaleHeight } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";

const OrderData = forwardRef((props, ref) => {
  const totalSum = useSelector((state) => state.shopCartContainer?.totalSum);
  const shopCart = useSelector((state) => state.shopCartContainer?.shopCart);
  const user = useSelector((state) => state.auth?.user);

  const formatPrice = (price) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const [isEnabled, setIsEnabled] = useState(false); // Quản lý trạng thái của Switch
  const toggleSwitch = () => {
    setIsEnabled((prevState) => !prevState);
    console.log(isEnabled);
  };

  const [message, setMessage] = useState(""); // Quản lý nội dung lời nhắn

  const data = shopCart.flatMap((element) => {
    return element.items
      .filter((item) => item.product.isCheck === true)
      .map((item) => ({
        ...item,
        sellerId: element.id,
        user: element.user,
        phone: element.phone,
        address: element.address,
      }));
  });

  const items = data.flatMap((item) => ({
    postId: item.postId,
    title: item.title,
    quantity: item.product.quantityInShopcart,
    productId: item.product.productId,
    image: item.product.image,
    name: item.product.name,
    price: item.product.price,
  }));

  // Quản lý thông tin đơn hàng
  const orderInfo = {
    buyerId: user.id,
    buyerName: user.username,
    buyerPhone: user.phone,
    buyerAddress: user.address,
    sellerId: data[0].sellerId,
    sellerName: data[0].user,
    sellerPhone: data[0].phone,
    sellerAddress: data[0].address,
    items: items,
    note: message,
    orderPrice: totalSum,
    coin: isEnabled ? user.coin : 0,
    totalPrice: isEnabled ? totalSum - user.coin : totalSum,
    status: "choxuly",
    deleteShopCart: true,
  };

  // Expose dữ liệu order lên cha qua ref
  useImperativeHandle(ref, () => ({
    getOrderData: () => orderInfo, // Trả về dữ liệu đơn hàng khi được gọi
  }));

  return (
    <>
      {/* Giao diện hiển thị thông tin đơn hàng */}
      <View style={styles.orderContainer}>
        <Text style={styles.username}>Người bán: {data[0].user}</Text>
        {data.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <Image
              source={{ uri: item.product.image }}
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
                <Text style={styles.name}>{item.product.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.price}>
                  đ {formatPrice(item.product.price)}
                </Text>
                <Text style={styles.quantity}>
                  x{item.product.quantityInShopcart}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.line} />
        <View style={{ justifyContent: "space-between" }}>
          <Text style={styles.title}>Lời nhắn cho người bán</Text>
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            multiline
            numberOfLines={4}
            placeholder="Lời nhắn"
            style={styles.input}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.title}>
            Tổng số tiền ({data.length} sản phẩm)
          </Text>
          <Text style={styles.price}>đ {formatPrice(totalSum)}</Text>
        </View>
      </View>

      {/* Chuyển đổi sử dụng xu */}
      {user.coin ? (
        <View
          style={[
            styles.orderContainer,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.title}>Dùng {user.coin} Passwme Xu</Text>
          <Switch
            trackColor={{ false: "#767577", true: COLOR.mainColor }}
            thumbColor={isEnabled ? "white" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      ) : null}

      {/* Hiển thị tổng thanh toán */}
      <View
        style={[
          styles.orderContainer,
          {
            marginBottom: scaleHeight(15),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <Text style={styles.title}>Tổng thanh toán</Text>
        {isEnabled && user.coin ? (
          <Text style={styles.price}>
            đ {formatPrice(totalSum - user.coin)}
          </Text>
        ) : (
          <Text style={styles.price}>đ {formatPrice(totalSum)}</Text>
        )}
      </View>
    </>
  );
});

export default OrderData;

const styles = StyleSheet.create({
  orderContainer: {
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleWidth(15),
    borderRadius: scaleWidth(20),
    backgroundColor: "white",
    marginTop: scaleHeight(15),
    marginHorizontal: scaleWidth(15),
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
  username: {
    fontSize: 14,
    fontFamily: "semiBold",
    color: "#000",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#E5E5E5",
    marginVertical: scaleWidth(15),
  },
  green: {
    backgroundColor: "rgba(179, 218, 178, 0.5)", // Độ mờ đục 50%
    padding: scaleWidth(10),
    borderRadius: scaleWidth(10),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: scaleWidth(15),
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
  },
  modalView: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
  },
  input: {
    minHeight: scaleHeight(50),
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    marginBottom: scaleWidth(15),
    fontSize: 13,
    fontFamily: "regular",
    color: "#928E8E",
  },
  twobutton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleWidth(10),
    paddingHorizontal: scaleWidth(15),
  },
  buttonDong: {
    flex: 1,
    alignItems: "center",
  },
  buttonXacNhan: {
    flex: 1,
    alignItems: "center",
  },
  textButton: {
    color: COLOR.mainColor,
    fontSize: 14,
    fontFamily: "medium",
  },
  textButtonDong: {
    color: "#737373",
    fontSize: 14,
    fontFamily: "medium",
  },
});
