import React, { useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { scaleHeight, scaleWidth } from "../assets/constant/responsive";
import CustomButton from "./customButton";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ActiveListingCard({ post }) {
  const handleClick = () => {};
  const [products, setProduct] = useState(post.products);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options); // Trả về định dạng DD/MM/YYYY
  };

  const { minPrice, maxPrice } = useMemo(() => {
    if (!products || products.length === 0) {
      return { minPrice: 0, maxPrice: 0 };
    }

    const prices = products.map((product) => product.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [products]);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderPrice = () => {
      if (!products || products.length === 0) {
        return <Text>Liên hệ</Text>;
      }
  
      if (products.length === 1) {
        return (
          <Text style={styles.price}>{formatPrice(products[0].price)}đ</Text>
        );
      }
  
      if (minPrice === maxPrice) {
        return <Text style={styles.price}>{formatPrice(minPrice)}đ</Text>;
      }
  
      return (
        <Text style={styles.price}>
          {formatPrice(minPrice)}đ - {formatPrice(maxPrice)}đ
        </Text>
      );
    };

  return (
    <View style={styles.container_card}>
      <View style={styles.horizontalSpacerContainer}>
        <View style={{ flexDirection: "row" }}>
          {post.images ? (
            <Image source={{ uri: post.images[0] }} style={styles.image} />
          ) : (
            <Text>No image available</Text>
          )}
          <View style={styles.information}>
            <Text>{post.title}</Text>
            <Text>Giá: {renderPrice()}</Text>
            <Text>Ngày đăng: {formatDate(post.start)}</Text>
          </View>
        </View>
        <Feather name="more-vertical" size={24} color="black" style={{}} />
      </View>
      <View style={[styles.horizontalSpacerContainer, {}]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="information-circle-outline" size={24} color="grey" />
          <Text>Thông tin</Text>
        </View>
        <CustomButton
          width={scaleWidth(160)}
          height={scaleHeight(40)}
          borderRadius={8}
          backgroundColor="transparent"
          borderColor="#CFCFCF"
          borderWidth={0.5}
          fontSize={13}
          fontFamily="medium"
          color="black"
          title="Đẩy tin đề xuất"
          onPress={handleClick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_card: {
    width: "100%",
    height: scaleHeight(170),
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(15)
  },
  horizontalSpacerContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: scaleWidth(90),
    height: scaleWidth(90),
    marginRight: scaleWidth(20),
    resizeMode: "cover",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black"
  },
  information: {
    fontSize: 13,
    fontFamily: "medium",
    color: "black"
  }
});
