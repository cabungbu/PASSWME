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
import { COLOR } from "../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import Feather from "@expo/vector-icons/Feather";
import ShopIcon from "../../assets/icons/ShopIcon";
import FeedbackStars from "../../components/FeedbackStars";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./FeedbacksOfPostStyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "react-native";
import mainStyles from "../../styles/mainStyles";

const FeedbacksOfPost = () => {
  const route = useRoute();
  const feedbacks = route.params?.feedbacks;
  const navigation = useNavigation();
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
          <Image source={{ uri: item.buyerAvatar }} style={styles.avatar} />
          <View style={{ marginLeft: scaleWidth(10) }}>
            <Text style={styles.buyerName}>{item.buyerName}</Text>
            <FeedbackStars rating={item.rating} />
          </View>
          <Text style={styles.orderDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Text
          style={styles.grayText}
        >
          Loại sản phẩm: {item.productName}
        </Text>
        <View>
          <Text style={[styles.grayText, { color: "black" }]}>
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
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#EFEFEF" }}>
      <StatusBar
        translucent={true}
        backgroundColor="white"
        barStyle="dark-content"
      />
      <View style={mainStyles.headerContainer}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          name="chevron-back"
          size={scaleWidth(30)}
          color={COLOR.mainColor}
        />
        <Text style={mainStyles.headerText}>Đánh giá sản phẩm</Text>
      </View>
      <FlatList
        data={feedbacks}
        renderItem={renderItem}
        keyExtractor={(item) => item.orderId}
        contentContainerStyle={styles.container}
      />
      <ImageViewerModal />
    </View>
  );
};

export default FeedbacksOfPost;
