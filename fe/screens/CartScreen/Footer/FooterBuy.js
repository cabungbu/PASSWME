import React, { useState, useMemo } from "react";
import { TouchableOpacity, View, Modal, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { CheckBox } from "react-native-elements";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAllBoxTrue,
  checkAllBoxFalse,
} from "../../../redux/checkShopCart";
const FooterBuy = React.memo(({ isCheck }) => {
  const isCheckingAll = useSelector(
    (state) => state.shopCartContainer?.isCheckingAll
  );
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth?.user);
  const shopCart = useSelector((state) => state.shopCartContainer?.shopCart);
  const totalSum = useSelector((state) => state.shopCartContainer?.totalSum);
  const dispatch = useDispatch();
  const handelPress = () => {
    if (isCheckingAll) {
      checkAllBoxFalse(shopCart, user.id, dispatch);
    } else {
      console.log(isCheckingAll);
      checkAllBoxTrue(shopCart, user.id, dispatch);
    }
  };
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleBuy = () => {
    const checkedItems = shopCart.flatMap((element) => {
      return element.items
        .filter((item) => item.product.isCheck === true)
        .map((item) => ({
          ...item,
          sellerId: element.id,
          user: element.user,
        }));
    });
    if (checkedItems.length === 0) {
      setMessage("Vui lòng chọn ít nhất một sản phẩm");
      openModal();
      return false;
    }
    const firstUserId = checkedItems[0].sellerId;

    // Nếu có ít nhất một phần tử có user khác thì trả về false
    const allSameUser = checkedItems.every(
      (item) => item.sellerId === firstUserId
    );

    if (!allSameUser) {
      setMessage("Vui lòng chọn tất cả sản phẩm của cùng một người bán");
      openModal();
      return false;
    }
    navigation.navigate("CheckOut");
    setModalVisible(false);
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.allContainer}>
        <Text style={styles.allText}>Chọn tất cả</Text>
        <CheckBox
          checked={isCheckingAll}
          onPress={() => handelPress()}
          containerStyle={{ marginRight: 10, padding: 0 }}
        />
      </View>
      <View
        style={{
          height: "80%",
          width: scaleWidth(2),
        }}
      />
      <View style={styles.payContainer}>
        <Text style={styles.payText} numberOfLines={1}>
          Tổng thanh toán:
        </Text>
        <Text style={styles.payMoney}>{formatPrice(totalSum)}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleBuy()}>
        <Text style={styles.buyNowText}>Mua ngay</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.line}>{message}</Text>

            <TouchableOpacity
              style={styles.buttonDong}
              onPress={() => closeModal()}
            >
              <Text style={styles.textButton}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
});

export default FooterBuy;
