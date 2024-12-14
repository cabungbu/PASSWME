import React, { useMemo, useRef, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
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
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const RenderContent = React.memo(
  ({ onAddPress }) => {
    const user = useSelector((state) => state.auth?.user, shallowEqual);
    const shopCart = useSelector(
      (state) => state.shopCartContainer?.shopCart,
      shallowEqual
    );
    // console.log("rendering content nè: " + JSON.stringify(shopCart));

    const formatPrice = useMemo(() => {
      return (price) => {
        if (price === undefined || price === null) {
          return "0"; // Or any default value you prefer
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    }, []);

    const leftSwipe = () => {
      return (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity>
            <Text style={{ color: "red", paddingHorizontal: 20 }}>Xóa</Text>
          </TouchableOpacity>
        </View>
      );
    };
    const translateX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: withTiming(translateX.value) }],
      };
    });
    const swipeableRef = useRef(null);
    const handleSwipe = (gestureState) => {
      // Update shared value based on gesture
      translateX.value = gestureState.translationX;
    };

    return (
      <ScrollView style={{ flex: 1, paddingTop: scaleHeight(10) }}>
        {/* Render shop cart items here */}
        {shopCart && shopCart.length > 0 ? (
          shopCart.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <ShopName item={item} />
              {item.items &&
                item.items.map((post, index) => (
                  <Swipeable
                    ref={swipeableRef}
                    renderLeftActions={leftSwipe}
                    onSwipeableWillOpen={handleSwipe}
                  >
                    <View style={styles.shopNameContainer}>
                      <CheckBox post={post} sellerId={item.id} />
                      <View
                        style={{
                          backgroundColor: "blue",
                          marginRight: scaleWidth(10),
                          backgroundColor: "red",
                          borderRadius: 20,
                          overflow: "hidden", // Thêm này để ảnh nằm trong View
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              post.product.image ||
                              "https://t4.ftcdn.net/jpg/03/57/52/77/360_F_357527700_FVCDzgXx8qhKoouAUXL3NWjvQboG7huD.jpg",
                          }}
                          style={{
                            width: scaleHeight(70),
                            height: scaleHeight(70),
                            resizeMode: "cover",
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                          paddingRight: scaleWidth(10),
                        }}
                      >
                        <TouchableOpacity>
                          <Text style={styles.title}>
                            {post.title
                              ? post.title
                              : "Bài đăng không khả dụng"}
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.productContainer}>
                          <TouchableOpacity
                            style={styles.dropdownButtonStyle}
                            onPress={() => {
                              if (post.postId != null) onAddPress(post);
                            }}
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
                  </Swipeable>
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
      </ScrollView>
    );
  },
  (prevProps, nextProps) => {
    // Memoize by comparing specific props
    return prevProps.shopCart === nextProps.shopCart;
  }
);

export default RenderContent;
