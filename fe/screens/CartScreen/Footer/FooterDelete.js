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
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAllBoxTrue,
  checkAllBoxFalse,
} from "../../../redux/checkShopCart";

const FooterDelete = React.memo(({ isCheck }) => {
  const isCheckingAll = useSelector(
    (state) => state.shopCartContainer?.isCheckingAll
  );
  const user = useSelector((state) => state.auth?.user);
  const shopCart = useSelector((state) => state.shopCartContainer?.shopCart);
  const dispatch = useDispatch();
  const handelPress = () => {
    if (isCheckingAll) {
      checkAllBoxFalse(shopCart, user.id, dispatch);
    } else {
      console.log(isCheckingAll);
      checkAllBoxTrue(shopCart, user.id, dispatch);
    }
  };

  return (
    <View style={styles.footerDeleteContainer}>
      <View style={[styles.footerContainer, { alignItems: "center" }]}>
        <CheckBox
          checked={isCheckingAll}
          onPress={() => handelPress()}
          containerStyle={{ marginRight: 10, padding: 0 }}
        />
        <Text style={styles.allText}>Chọn tất cả</Text>
      </View>
      <TouchableOpacity style={styles.buttonDelete}>
        <Text style={styles.deleteText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
});

export default FooterDelete;
