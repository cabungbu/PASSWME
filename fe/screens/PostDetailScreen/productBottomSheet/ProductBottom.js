import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import Feather from "@expo/vector-icons/Feather";
import styles from "./style";
import { COLOR } from "../../../assets/constant/color";
import { addProductToCart } from "../../../redux/shopCartService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";
export default function ProductBottom({ products, post, onClosePress }) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [disabledPlus, setDisabledPlus] = useState(false);
  const [disabledSub, setDisabledSub] = useState(true);
  const [isAdd, setIsAdd] = useState("Thêm vào giỏ hàng");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const error = useSelector((state) => state.shopCartContainer?.error);
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const toast = useToast();
  // useEffect(() => {
  //   toast.show("nga", {
  //     type: "success",
  //     placement: "top",
  //     duration: 3000,
  //     offset: 30,
  //     animationType: "slide-in ",
  //   });
  // }, []);
  const handleChooseProduct = (index) => {
    setSelectedProduct(products[index]);
    // onClosePress();
  };

  const handlePlus = () => {
    if (selectedQuantity < selectedProduct.quantity) {
      setSelectedQuantity(selectedQuantity + 1);
      if (selectedQuantity + 1 === selectedProduct.quantity) {
        setDisabledPlus(true);
      }
      setDisabledSub(false); // Enable subtract button
    }
  };

  const handleSubtract = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
      if (selectedQuantity - 1 === 1) {
        setDisabledSub(true);
      }
      setDisabledPlus(false); // Enable add button
    }
  };

  const addToShopCart = async () => {
    setIsAdd("Đang thêm...");
    const newProduct = {
      sellerId: post.owner.id,
      postId: post.id,
      productId: selectedProduct.id,
      quantity: selectedQuantity,
    };
    const res = await addProductToCart(dispatch, newProduct, user.id);
    if (res) {
      toast.show(res, {
        type: "success",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "slide-in ",
      });
    } else {
      toast.show(error, {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "slide-in ",
      });
    }
    setIsAdd("Thêm vào giỏ hàng");
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.id}
      style={
        item.id === selectedProduct.id ? styles.selected : styles.notSelected
      }
      onPress={() => handleChooseProduct(index)}
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
        <TouchableOpacity onPress={onClosePress}>
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
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.grayline2} />

      <View style={styles.section3}>
        <Text style={styles.soluong}>Số lượng</Text>
        <View style={styles.updateQuantity}>
          {disabledSub ? (
            <View style={styles.plus}>
              <Text style={[styles.text, { color: "#A0A0A0" }]}>-</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.plus} onPress={handleSubtract}>
              <Text style={styles.text}>-</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.quantity}>{selectedQuantity}</Text>
          {disabledPlus ? (
            <View style={styles.plus}>
              <Text style={[styles.text, { color: "#A0A0A0" }]}>+</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.plus} onPress={handlePlus}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.grayline3} />

      <TouchableOpacity style={styles.button} onPress={() => addToShopCart()}>
        <Text style={styles.addCartText}>{isAdd}</Text>
      </TouchableOpacity>

      <View style={styles.bottom} />
    </View>
  );
}
