import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantityFunction,
  decreaseQuantityFunction,
} from "../../../redux/checkShopCart";

const QuantitySlider = ({ post, item }) => {
  const user = useSelector((state) => state.auth?.user);
  const [modalVisible, setModalVisible] = React.useState(false);
  const error = useSelector((state) => state.shopCartContainer?.error);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const dispatch = useDispatch();
  const handleIncrease = async () => {
    const product = {
      sellerId: item.id,
      postId: post.postId,
      productId: post.product.productId,
      quantity: post.product.quantityInShopcart + 1,
    };

    const res = await increaseQuantityFunction(user.id, product, dispatch);
    if (res != null) {
      setModalVisible(true);
    }
  };

  const handleDecrease = async () => {
    if (post.product.quantityInShopcart <= 1) {
      return;
    }
    const product = {
      sellerId: item.id,
      postId: post.postId,
      productId: post.product.productId,
      quantity: post.product.quantityInShopcart - 1,
    };

    const res = await decreaseQuantityFunction(user.id, product, dispatch);
    if (res != null) {
      setModalVisible(true);
    }
  };
  return (
    <View style={styles.updateQuantity}>
      <TouchableOpacity style={styles.plus} onPress={() => handleDecrease()}>
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{post.product.quantityInShopcart}</Text>
      <TouchableOpacity style={styles.plus} onPress={() => handleIncrease()}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            {error && (
              <Text style={styles.line}>{error || "An error occurred."}</Text> // Display the message or a default error message
            )}

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
};
export default QuantitySlider;
