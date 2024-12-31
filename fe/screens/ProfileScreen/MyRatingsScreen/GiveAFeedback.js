import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import mainStyles from "../../../styles/mainStyles";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";

import Ionicons from "@expo/vector-icons/Ionicons";

import Entypo from "@expo/vector-icons/Entypo";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { COLOR } from "../../../assets/constant/color";
import styles from "./GiveAFeedbackStyle";
import CustomButton from "../../../components/customButton";
import InteractiveStars from "../../../components/InteractiveStars";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase_config";
import ImageAddIcon from "../../../assets/icons/ImageAddIcon";
import Feather from "@expo/vector-icons/Feather";
import VideoAddIcon from "../../../assets/icons/VideoAddIcon";
import axios from "axios";
import { BE_ENDPOINT } from "../../../settings/localVars";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GiveAFeedback = ({ route }) => {
  const { orderId, orderData } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState(Array(4).fill(null));
  const [video, setVideo] = useState(null);
  const [rating, setRating] = useState(0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [5, 6],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImageUri = result.assets[0].uri;

      const updatedImages = [...images];
      const indexToReplace = updatedImages.findIndex((img) => img === null);
      if (indexToReplace !== -1) {
        updatedImages[indexToReplace] = newImageUri;
        setImages(updatedImages);
      }
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "videos",
      allowsEditing: true,
      aspect: [5, 6],
      videoQuality: 0.8,
    });
    if (!result.canceled) setVideo(result.assets[0].uri);
  };

  const deleteImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const deleteVideo = () => {
    setVideo(null);
  };

  const handleGivingFeedback = async () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }
    setIsLoading(true);
    try {
      const uploadedImageUrls = [];
      let uploadedVideoUrl = null;

      // Upload images and get their download URLs
      for (const image of images) {
        if (image) {
          const filename = `image_${Date.now()}_${Math.random()
            .toString(36)
            .substring(7)}.jpg`;
          const storageRef = ref(storage, `feedback_images/${filename}`);

          const response = await fetch(image);
          const blob = await response.blob();

          await uploadBytes(storageRef, blob);
          // Get the download URL after upload
          const downloadURL = await getDownloadURL(storageRef);
          uploadedImageUrls.push(downloadURL);
        }
      }

      // Upload video if exists
      if (video) {
        const videoFilename = `video_${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}.mp4`;
        const videoRef = ref(storage, `feedback_videos/${videoFilename}`);

        const response = await fetch(video);
        const videoBlob = await response.blob();

        await uploadBytes(videoRef, videoBlob);
        // Get the download URL for video
        uploadedVideoUrl = await getDownloadURL(videoRef);
      }
      const feedbackData = {
        orderId: orderId,
        rating: rating,
        comment: comment,
        images: uploadedImageUrls ? uploadedImageUrls: [],
        video: uploadedVideoUrl ? uploadedVideoUrl : ""
      };

      const response = await axios.post(
        BE_ENDPOINT + "/feedback/addFeedback",
        feedbackData
      );
      alert("Đã gửi feedback thành công!");
      navigation.goBack();
    } catch (error) {
      console.error("Error uploading files or posting data:", error);
      alert("Đã xảy ra lỗi khi đánh giá.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
      <ScrollView style={styles.content}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#cfcfcf",
            paddingBottom: scaleWidth(15),
          }}
        >
          {orderData.map((item, index) => (
            <View key={index} style={styles.row}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={{ width: scaleWidth(330) }}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.productName}>{item.name}</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={[styles.titleText, { marginTop: scaleHeight(15) }]}>
          Đánh giá sản phẩm
        </Text>
        <InteractiveStars onRatingChange={(number) => setRating(number)} />
        <Text style={[styles.textInput, { marginTop: scaleHeight(15) }]}>
          Hãy thêm ít nhất 1 hình ảnh/video về sản phẩm
        </Text>
        <View style={styles.row}>
          <View style={styles.imgPicker}>
            <Ionicons
              name="camera"
              size={50}
              color={COLOR.mainColor}
              onPress={pickImage}
            />
            <Text style={styles.imgPicker_text}>ĐĂNG TỪ 1 ĐẾN 4 HÌNH</Text>
          </View>
          <View style={styles.imgPicker}>
            <Entypo
              name="folder-video"
              size={50}
              color={COLOR.mainColor}
              onPress={pickVideo}
            />
            <Text style={styles.imgPicker_text}>ĐĂNG TỐI ĐA 01 VIDEO</Text>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "flex-start" }]}>
          {images.map((img, index) => (
            <View key={index}>
              {img ? (
                <View>
                  <Image
                    source={{ uri: img }}
                    style={{
                      width: scaleWidth(50),
                      height: scaleHeight(60),
                      borderRadius: 10,
                      resizeMode: "contain",
                    }}
                  />
                  <Feather
                    name="x"
                    size={20}
                    color="black"
                    style={styles.delete_imgAndVideo}
                    onPress={() => deleteImage(index)}
                  />
                </View>
              ) : (
                <View style={styles.border_imgIcon}>
                  <ImageAddIcon size={35} />
                </View>
              )}
            </View>
          ))}
          <View>
            {video ? (
              <View>
                <Video
                  source={{ uri: video }}
                  style={{
                    width: scaleWidth(50),
                    height: scaleHeight(60),
                    borderRadius: 10,
                  }}
                  useNativeControls
                  resizeMode="cover"
                  controls={true}
                  onError={(e) => console.log(e)}
                />
                <Feather
                  name="x"
                  size={20}
                  color="black"
                  style={styles.delete_imgAndVideo}
                  onPress={deleteVideo}
                />
              </View>
            ) : (
              <View style={styles.border_imgIcon}>
                <VideoAddIcon size={35} />
              </View>
            )}
          </View>
        </View>
        <Text style={[styles.titleText, { marginTop: scaleHeight(15) }]}>
          Viết đánh giá từ 50 ký tự:
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Hãy chia sẻ nhận xét của bạn về sản phẩm này!"
            maxLength={50}
            onChangeText={(text) => setComment(text)}
          />
          <Text
            style={{
              position: "absolute",
              bottom: 5,
              right: 10,
              color: "gray",
            }}
          >
            {comment.length}/50
          </Text>
        </View>
        <View style={styles.buttonPosition}>
          <CustomButton
            title={isLoading ? "Đang gửi..." : "Gửi đánh giá"}
            width={"100%"}
            height={scaleHeight(50)}
            marginTop={scaleHeight(50)}
            backgroundColor={COLOR.mainColor}
            borderRadius={10}
            onPress={handleGivingFeedback}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default GiveAFeedback;
