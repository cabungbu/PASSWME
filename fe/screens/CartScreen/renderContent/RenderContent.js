import React, { useMemo, useRef, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "./style";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import Ionicons from "@expo/vector-icons/Ionicons";
import CheckBox from "./CheckBox";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import ShopName from "./ShopName";
import { COLOR } from "../../../assets/constant/color";
import QuantitySlider from "./QuantitySlider";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { deleteProduct } from "../../../redux/checkShopCart";
import { deleteProductShopCart } from "../../../redux/shopCartSlice";
import ModalConfirmDelete from "../../../components/ModalComfirmDelete";

const RenderContent = React.memo(
  ({ onAddPress }) => {
    configureReanimatedLogger({
      level: ReanimatedLogLevel.warn,
      strict: false, // Reanimated runs in strict mode by default
    });
    const user = useSelector((state) => state.auth?.user, shallowEqual);
    const shopCart = useSelector(
      (state) => state.shopCartContainer?.shopCart,
      shallowEqual
    );
    const dispatch = useDispatch();
    // console.log("rendering content nè: " + JSON.stringify(shopCart));

    const formatPrice = useMemo(() => {
      return (price) => {
        if (price === undefined || price === null) {
          return "0"; // Or any default value you prefer
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    }, []);

    const leftSwipe = (item, post) => {
      return (
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() =>
              handleDelete(item.id, post.postId, post.product.productId)
            }
          >
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
    const handleDelete = async (sellerId, postId, productId) => {
      const product = {
        sellerId: sellerId,
        postId: postId,
        productId: productId,
      };
      const shopcart = shopCart;
      console.log(sellerId);
      dispatch(deleteProductShopCart({ shopcart, product }));
      await deleteProduct(shopCart, user.id, product, dispatch);
    };

    return (
      <ScrollView style={{ flex: 1, paddingTop: scaleHeight(10) }}>
        {/* Render shop cart items here */}
        {shopCart && shopCart.length > 0 ? (
          shopCart.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <ShopName item={item} />
              {item.items &&
                item.items.map((post) => (
                  <Swipeable
                    ref={swipeableRef}
                    renderLeftActions={() => leftSwipe(item, post)}
                    onSwipeableWillOpen={handleSwipe}
                  >
                    <View style={styles.shopNameContainer}>
                      <CheckBox
                        post={post}
                        isCheck={post.product.isCheck}
                        sellerId={item.id}
                      />

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
                          marginRight: scaleWidth(10),
                          borderRadius: 20,
                          overflow: "hidden",
                        }}
                      />

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
                          <QuantitySlider post={post} item={item} />
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
