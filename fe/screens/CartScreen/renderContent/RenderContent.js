import React, { useMemo, useRef, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import Ionicons from "@expo/vector-icons/Ionicons";
import CheckBox from "./CheckBox";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import ShopName from "./ShopName";
import { COLOR } from "../../../assets/constant/color";
import QuantitySlider from "./QuantitySlider";
const RenderContent = React.memo(
  ({ onAddPress }) => {
    const user = useSelector((state) => state.auth?.user, shallowEqual);
    const shopCart = useSelector(
      (state) => state.shopCartContainer?.shopCart,
      shallowEqual
    );
    console.log("rendering content nè");

    const formatPrice = useMemo(() => {
      return (price) => {
        if (price === undefined || price === null) {
          return "0"; // Or any default value you prefer
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    }, []);

    return (
      <View style={{ flex: 1, paddingTop: scaleHeight(10) }}>
        {/* Render shop cart items here */}
        {shopCart && shopCart.length > 0 ? (
          shopCart.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <ShopName item={item} />
              {item.items &&
                item.items.map((post, index) => (
                  <View key={index} style={styles.shopNameContainer}>
                    <CheckBox post={post} sellerId={item.id} />
                    <Image
                      source={{ uri: post.product.image }}
                      style={{
                        width: scaleHeight(70),
                        marginRight: scaleWidth(10),
                        height: scaleHeight(70),
                        borderRadius: 20,
                        resizeMode: "cover",
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        marginRight: scaleWidth(10),
                      }}
                    >
                      <TouchableOpacity>
                        <Text style={styles.title}>{post.title}</Text>
                      </TouchableOpacity>
                      <View style={styles.productContainer}>
                        <TouchableOpacity
                          style={styles.dropdownButtonStyle}
                          onPress={() => onAddPress(post)}
                        >
                          {post.product.quantity == 0 ? (
                            <Text numberOfLines={1} style={styles.name}>
                              Hết số lượng sản phẩm
                            </Text>
                          ) : (
                            <Text numberOfLines={1} style={styles.name}>
                              {post.product.name}
                            </Text>
                          )}

                          <Entypo
                            name="chevron-down"
                            size={20}
                            color="#A0A0A0"
                          />
                        </TouchableOpacity>
                        <QuantitySlider post={post} />
                      </View>

                      <Text style={styles.price}>
                        {formatPrice(post.product.price)} đ
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          ))
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.shopNameText}>Giỏ hàng trống</Text>
          </View>
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Memoize by comparing specific props
    return prevProps.shopCart === nextProps.shopCart;
  }
);

export default RenderContent;
