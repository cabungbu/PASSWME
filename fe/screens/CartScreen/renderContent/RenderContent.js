import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CheckBox, Icon } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SelectDropdown from "react-native-select-dropdown";
import Entypo from "@expo/vector-icons/Entypo";

const RenderContent = ({ shopCart }) => {
  const [isChecked, setIsChecked] = useState(false);
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const emojisWithIcons = [
    { title: "happy" },
    { title: "cool" },
    { title: "lol" },
    { title: "sad" },
    { title: "cry" },
  ];
  const content = useMemo(() => {
    return (
      <View style={{ flex: 1, paddingTop: scaleHeight(10) }}>
        {/* Render shop cart items here */}
        {shopCart && shopCart.length > 0 ? (
          shopCart.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              {/* Render each cart item */}
              <TouchableOpacity style={styles.shopNameContainer}>
                <CheckBox containerStyle={{ marginRight: 10, padding: 0 }} />
                <Ionicons name="storefront-outline" size={20} color="#707070" />
                <Text style={styles.shopNameText}>{item.user}</Text>
                <MaterialIcons name="navigate-next" size={20} color="#ccc" />
              </TouchableOpacity>

              {item.items &&
                item.items.map((post, index) => (
                  <View key={index} style={styles.shopNameContainer}>
                    <CheckBox
                      containerStyle={{ marginRight: 10, padding: 0 }}
                    />
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
                        <SelectDropdown
                          data={emojisWithIcons}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                          }}
                          renderButton={(selectedItem, isOpened) => {
                            return (
                              <View style={styles.dropdownButtonStyle}>
                                <Text numberOfLines={1} style={styles.name}>
                                  {post.product.name}
                                </Text>
                                <Entypo
                                  name="chevron-small-down"
                                  size={20}
                                  color="#A0A0A0"
                                />
                              </View>
                            );
                          }}
                          renderItem={(item, index, isSelected) => {
                            return (
                              <View
                                style={{
                                  ...styles.dropdownItemStyle,
                                  ...(isSelected && {
                                    backgroundColor: "#D2D9DF",
                                  }),
                                }}
                              >
                                <Text
                                  numberOfLines={1}
                                  style={styles.dropdownItemTxtStyle}
                                >
                                  {item.title}
                                </Text>
                              </View>
                            );
                          }}
                          showsVerticalScrollIndicator={false}
                          dropdownStyle={styles.dropdownMenuStyle}
                        />

                        <View style={styles.updateQuantity}>
                          <TouchableOpacity style={styles.plus}>
                            <Text style={styles.text}>+</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantity}>
                            {post.product.quantityInShopcart}
                          </Text>
                          <TouchableOpacity style={styles.plus}>
                            <Text style={styles.text}>-</Text>
                          </TouchableOpacity>
                        </View>
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
  }, [shopCart]);

  return content;
};

export default RenderContent;
