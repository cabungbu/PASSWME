import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import Feather from "@expo/vector-icons/Feather";
import styles from "./style";
import { COLOR } from "../../../assets/constant/color";
export default function ProductBottom({ products, onClosePress }) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleChooseProduct = (index) => {
    setSelectedProduct(products[index]);
    // onClosePress();
  };
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.id}
      style={
        item.id === selectedProduct.id ? styles.selected : styles.notSelected
      }
      onPress={() => handleChooseProduct(index)} // Sửa cách gọi hàm
    >
      <Text
        style={{
          color: item.id === selectedProduct.id ? COLOR.mainColor : "#000",
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <View style={styles.firstSection}>
        <Image
          source={{ uri: selectedProduct?.image }}
          style={{
            width: scaleWidth(150),
            height: scaleWidth(150),
            borderRadius: scaleWidth(10),
          }}
        />
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            đ {formatPrice(selectedProduct?.price)}
          </Text>
          <Text style={styles.quantityText}>
            Kho: {selectedProduct.quantity}
          </Text>
        </View>
        <TouchableOpacity>
          <Feather name="x-circle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.grayline} />
      <Text style={styles.phanloai}>Phân loại</Text>
      <View>
        <FlatList
          data={products}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.grayline2} />

      <View style={styles.section3}>
        <Text style={styles.soluong}>Số lượng</Text>
        <View style={styles.updateQuantity}>
          <TouchableOpacity style={styles.plus}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>1</Text>
          <TouchableOpacity style={styles.plus}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.grayline3} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.addCartText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>

      <View style={styles.bottom} />
    </View>
  );
}
