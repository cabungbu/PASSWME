import { Video } from "expo-av";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR } from "../assets/constant/color";
import { scaleHeight, scaleWidth } from "../assets/constant/responsive";

import Feather from "@expo/vector-icons/Feather";
import ShopIcon from "../assets/icons/ShopIcon";
import FeedbackStars from "./FeedbackStars";

const Buyer_FeedbackGivenCard = ({ feedbacks }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  const ImageViewerModal = () => (
    <Modal
      transparent={true}
      visible={isImageViewerVisible}
      onRequestClose={() => {
        setIsImageViewerVisible(false);
        setSelectedImage(null);
      }}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeModelButton}
          onPress={() => {
            setIsImageViewerVisible(false);
            setSelectedImage(null);
          }}
        >
          <Feather name="x" size={30} color="white" />
        </TouchableOpacity>

        <Image source={{ uri: selectedImage }} style={styles.imageModel} />
      </View>
    </Modal>
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <ShopIcon size={20} color="#a0a0a0" />
          <Text style={[styles.grayText, { marginLeft: scaleWidth(10) }]}>
            {item.sellerName}
          </Text>
          <Text style={styles.orderDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {item.items.map((product, index) => (
          <View key={index} style={styles.productContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.title} numberOfLines={2}>
                {product.title}
              </Text>
              <Text style={[styles.grayText, { fontSize: 14 }]}>
                {product.name}
              </Text>
              {/* <Text style={styles.price}>₫{product.price}</Text> */}
            </View>
          </View>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={[
                styles.grayText,
                { fontSize: 12, marginBottom: scaleHeight(5) },
              ]}
            >
              {item.comment}
            </Text>
            <View>
              {item.images?.map((img, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedImage(img);
                    setIsImageViewerVisible(true);
                  }}
                >
                  <Image
                    source={{ uri: img }}
                    style={{
                      width: scaleWidth(40),
                      height: scaleHeight(48),
                      borderRadius: 5,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              ))}
              {item.video && (
                <Video
                  source={{ uri: item.video }}
                  style={{
                    width: scaleWidth(40),
                    height: scaleHeight(48),
                    borderRadius: 5,
                  }}
                  useNativeControls
                  resizeMode="cover"
                  controls={true}
                  onError={(e) => console.log(e)}
                />
              )}
            </View>
          </View>
          <FeedbackStars rating={item.rating} />
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={feedbacks}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        contentContainerStyle={styles.container}
      />
      <ImageViewerModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    backgroundColor: "white",
    padding: scaleWidth(15),
    marginBottom: 1,
    // elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  shopInfo: {},
  grayText: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#707070",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    textAlign: "right",
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: scaleHeight(20),
  },
  productImage: {
    width: scaleWidth(90),
    height: scaleWidth(90),
    resizeMode: "contain",
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: scaleWidth(10),
  },
  title: {
    fontSize: 15,
    marginBottom: scaleHeight(5),
    fontFamily: "regular",
  },
  price: {
    fontSize: 15,
    fontFamily: "semiBold",
    color: COLOR.mainColor,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeModelButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  imageModel: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
});

export default Buyer_FeedbackGivenCard;
