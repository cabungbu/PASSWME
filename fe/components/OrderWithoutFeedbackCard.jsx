import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import { scaleHeight, scaleWidth } from "../assets/constant/responsive";
import CustomButton from "./customButton";
import { COLOR } from "../assets/constant/color";

import ShopIcon from "../assets/icons/ShopIcon";
import { useNavigation } from "@react-navigation/native";

const OrderWithoutFeedbackCard = ({ orders }) => {
  const navigation = useNavigation()
  const calculateTimeLeft = (completionDate) => {
    const completion = new Date(completionDate);
    const deadline = new Date(completion.getTime() + 7 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const timeLeft = deadline - now;

    if (timeLeft <= 0) return "Hết hạn đánh giá";

    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );

    return `Còn ${days} ngày ${hours} giờ để đánh giá`;
  };
  const renderItem = ({ item }) => {
    if (item.feedbacks.length > 0) return null;

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <ShopIcon size={20} color="#a0a0a0" />
          <View style={styles.shopInfo}>
            <Text style={styles.grayText}>{item.sellerName}</Text>
          </View>
        </View>

        {item.items.map((product, index) => (
          <View key={index} style={styles.productContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.title} numberOfLines={2}>
                {product.title}
              </Text>
              <Text style={[styles.grayText, { fontSize: 14 }]}>
                {product.name}
              </Text>
              {/* <Text style={styles.price}>₫{product.price}</Text> */}
            </View>
          </View>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text style={[styles.grayText, { fontSize: 12, maxWidth: "50%" }]}>
            {calculateTimeLeft(item.completeDate)}
          </Text>
          <CustomButton
            width={scaleWidth(170)}
            height={scaleHeight(40)}
            borderRadius={8}
            backgroundColor={COLOR.mainColor}
            fontSize={14}
            fontFamily="medium"
            color="white"
            title="Đánh giá +100"
            onPress={()=> navigation.navigate("GiveAFeedbackScreen", {
              orderId: item.id,
              orderData: item.items
            })}
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      kkeyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#a0a0a0",
    borderBottomWidth: 0.5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: scaleWidth(15),
    // marginBottom: 16,
    // elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  shopInfo: {
    marginLeft: scaleWidth(10),
  },
  grayText: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#707070",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: scaleHeight(20),
  },
  productImage: {
    width: scaleWidth(90),
    height: scaleWidth(90),
    resizeMode: "contain",
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: scaleWidth(10),
  },
  title: {
    fontSize: 15,
    marginBottom: scaleHeight(5),
    fontFamily: "regular",
  },
  price: {
    fontSize: 15,
    fontFamily: "semiBold",
    color: COLOR.mainColor,
  },
});

export default OrderWithoutFeedbackCard;
