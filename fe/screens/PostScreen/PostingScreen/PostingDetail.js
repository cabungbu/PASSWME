import {
  View,
  Text,
  StatusBar,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useMemo } from "react";
import styles from "./PostingDetailStyle";
import mainStyles from "../../../styles/mainStyles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { firebaseConfig } from "../../../firebase_config";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Video } from "expo-av";

import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { COLOR } from "../../../assets/constant/color";
import PostProduct from "../../../components/PostProduct";
import CustomButton from "../../../components/customButton";

import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import ImageAddIcon from "../../../assets/icons/ImageAddIcon";
import VideoAddIcon from "../../../assets/icons/VideoAddIcon";
import { useSelector } from "react-redux";
import AddressPicker from "../../ProfileScreen/SettingScreen/AddressPicker";
import axios from "axios";
import { BE_ENDPOINT } from "../../../settings/localVars";

initializeApp(firebaseConfig);

const PostingDetail = ({ route, navigation }) => {
  navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);

  const { categoryId, categoryName } = route.params;
  const [images, setImages] = useState(Array(6).fill(null));
  const [video, setVideo] = useState(null);
  const [products, setProducts] = useState([
    {
      name: "",
      price: 0,
      quantity: 0,
      image: "",
    },
  ]);
  const [condition, setCondition] = useState("used");
  const [price, setPrice] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateAddress, setUpdateAddress] = useState(false);
  const [fullAddress, setFullAddress] = useState("");

  const addProduct = () => {
    setProducts([
      ...products,
      {
        name: "",
        price: 0,
        quantity: 0,
        image: "",
      },
    ]);
  };

  const handleChangeText = (text, index, field) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = text;
    setProducts(updatedProducts);
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

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

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const { minPrice, maxPrice } = useMemo(() => {
    if (!products || products.length === 0) {
      return { minPrice: 0, maxPrice: 0 };
    }

    const prices = products.map((product) => product.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [products]);

  const renderPrice = () => {
    if (!products || products.length === 0) {
      return <Text style={styles.price}>0đ</Text>;
    }

    if (products.length === 1) {
      return (
        <Text style={styles.price}>{formatPrice(products[0].price)}đ</Text>
      );
    }

    if (minPrice === maxPrice) {
      return <Text style={styles.price}>{formatPrice(minPrice)}đ</Text>;
    }

    return (
      <Text style={styles.price}>
        {formatPrice(minPrice)}đ - {formatPrice(maxPrice)}đ
      </Text>
    );
  };

  const handlePost = async () => {
    if (!title || !description || products.length === 0 || images.every(img => img === null)) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    } 

    for (const product of products) {
      if (!product.name || product.price < 0 || product.quantity <= 0 || !product.image) {
        alert("Vui lòng đảm bảo tất cả các sản phẩm đều có tên, giá, số lượng và hình ảnh hợp lệ.");
        return;
      }
    }

    if (images.length > 0) {
      try {
        const storage = getStorage();

        for (const image of images) {
          if (image) {
            const filename = `image_${Date.now()}.jpg`;
            const storageRef = ref(storage, `images/${filename}`);

            const response = await fetch(image);
            const blob = await response.blob();

            await uploadBytes(storageRef, blob);
          }
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload images");
      }
    }

    if (video) {
      try {
        const storage = getStorage();
        const videoFilename = `video_${Date.now()}.mp4`;
        const videoRef = ref(storage, `videos/${videoFilename}`);

        const response = await fetch(video);
        const videoBlob = await response.blob();

        await uploadBytes(videoRef, videoBlob);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload video");
      }
    }

    const validImages = images.filter((image) => image !== null);

    const postData = {
      title: title,
      category: categoryId,
      images: validImages,
      video: video,
      status: "active",
      description: description,
      service: "",
      start: new Date().toISOString(),
      owner: user.id,
      condition: condition,
      address: fullAddress ? fullAddress : user?.address,
      soldQuantity: 0,
      products: products,
    };

    try {
      const response = await axios.post(
        BE_ENDPOINT + "/post/addPost",
        postData
      );
      navigation.navigate("PostedScreen", {
        image: images[0],
        title: title,
        price: minPrice === maxPrice ? formatPrice(minPrice) : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`,
      });
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Đã xảy ra lỗi khi đăng bài.");
    }
  };

  const toggleUpdateState = () => {
    setUpdateAddress(!updateAddress);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={mainStyles.headerCenterContainer}>
        <Ionicons
          style={mainStyles.headerIcon}
          name="chevron-back"
          size={scaleWidth(30)}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={[mainStyles.headerCenterText, { marginRight: scaleWidth(30) }]}
        >
          Đăng tin
        </Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.section_textLabel}>
          Danh mục:{" "}
          <Text style={{ color: COLOR.mainColor }}>{categoryName}</Text>
        </Text>
        <View style={styles.section_label}>
          <Text style={styles.section_textLabel}>Thông tin chi tiết</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 12, fontFamily: "regular" }}>
              Xem thêm thông tin về
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("PostingRulesScreen")}
            >
              <Text style={styles.linkText}>
                {" "}
                Quy định đăng tin của PASSWME
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section_container}>
          <View style={styles.row}>
            <View style={styles.imgPicker}>
              <Ionicons
                name="camera"
                size={50}
                color={COLOR.mainColor}
                onPress={pickImage}
              />
              <Text style={styles.imgPicker_text}>ĐĂNG TỪ 1 ĐẾN 6 HÌNH</Text>
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
          <View style={styles.row}>
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
          <Text style={styles.label}>
            Sản phẩm <Text style={{ color: COLOR.mainColor }}>*</Text>
          </Text>
          <View>
            {products.map((product, index) => (
              <View key={index} style={styles.row}>
                <PostProduct
                  onChangeName={(text) => handleChangeText(text, index, "name")}
                  onChangePrice={(text) =>
                    handleChangeText(text, index, "price")
                  }
                  onChangeQuantity={(text) =>
                    handleChangeText(text, index, "quantity")
                  }
                  onChangeImage={(uri) => {
                    // console.log(
                    //   `Updating product image at index ${index} to: ${uri}`
                    // );
                    const updatedProducts = [...products];
                    updatedProducts[index].image = uri;
                    setProducts(updatedProducts);
                  }}
                />
                {index === 0 ? (
                  <Feather
                    name="plus"
                    size={scaleWidth(30)}
                    color="#369C33"
                    style={{
                      backgroundColor: "rgba(179,218,178, 0.5)",
                      borderRadius: 5,
                    }}
                    onPress={addProduct}
                  />
                ) : (
                  <Feather
                    name="x"
                    size={scaleWidth(30)}
                    color={COLOR.mainColor}
                    style={{
                      backgroundColor: "rgba(227,4,20, 0.3)",
                      borderRadius: 5,
                    }}
                    onPress={() => deleteProduct(index)}
                  />
                )}
              </View>
            ))}
          </View>
          <Text style={styles.label}>
            Tình trạng <Text style={{ color: COLOR.mainColor }}>*</Text>
          </Text>
          <View style={styles.row}>
            <CustomButton
              width={scaleWidth(120)}
              height={scaleHeight(40)}
              borderRadius={20}
              fontSize={13}
              fontFamily="regular"
              color={condition === "used" ? "white" : COLOR.mainColor}
              backgroundColor={
                condition === "used" ? COLOR.mainColor : "#f1f1f1"
              }
              title="Đã sử dụng"
              onPress={() => setCondition("used")}
            />
            <CustomButton
              width={scaleWidth(120)}
              height={scaleHeight(40)}
              borderRadius={20}
              fontSize={13}
              fontFamily="regular"
              color={condition === "99%" ? "white" : COLOR.mainColor}
              backgroundColor={
                condition === "99%" ? COLOR.mainColor : "#f1f1f1"
              }
              title="99%"
              onPress={() => setCondition("99%")}
            />
            <CustomButton
              width={scaleWidth(120)}
              height={scaleHeight(40)}
              borderRadius={20}
              fontSize={13}
              fontFamily="regular"
              color={condition === "new" ? "white" : COLOR.mainColor}
              backgroundColor={
                condition === "new" ? COLOR.mainColor : "#f1f1f1"
              }
              title="Mới"
              onPress={() => setCondition("new")}
            />
          </View>
          <Text style={styles.label}> Giá bán: {renderPrice()} </Text>
        </View>
        <View style={styles.section_label}>
          <Text style={styles.section_textLabel}>
            Tiêu đề tin đăng và mô tả
          </Text>
        </View>
        <View style={styles.section_container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={"Tiêu đề tin đăng *"}
              maxLength={50}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <Text>{title.length}/50</Text>
          <Text style={styles.label}>
            Mô tả <Text style={{ color: COLOR.mainColor }}>*</Text>
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder={
                "Xuất xứ, tình trạng hàng hóa/sản phẩm \nTên sản phẩm\nNhãn hiệu\nChất liệu, kích thước\nĐồ cho bé: dùng cho bé mấy tuổi\nChính sách bảo hành, bảo trì đổi trả hàng hóa/sản phẩm\nĐịa chỉ giao nhận, đổi trả hàng hóa/sản phẩm"
              }
              maxLength={1500}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <Text>{description.length}/1500</Text>
        </View>

        <View style={styles.section_label}>
          <Text style={styles.section_textLabel}>Thông tin người bán</Text>
        </View>
        <View style={styles.section_container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder={user ? `${user.address}` : "Nhập địa chỉ của bạn"}
              value={fullAddress}
            />
            <MaterialIcons
              name="edit"
              size={scaleWidth(24)}
              color={updateAddress ? COLOR.mainColor : "#a0a0a0"}
              onPress={toggleUpdateState}
              style={styles.editAddressIcon}
            />
          </View>
          {updateAddress && (
            <View style={{ marginTop: scaleHeight(10) }}>
              <AddressPicker
                setFullAddress={setFullAddress}
                onClose={() => setUpdateAddress(false)}
              />
            </View>
          )}
        </View>
        <View style={{ marginBottom: scaleHeight(30) }}>
          <CustomButton
            width={"100%"}
            height={scaleHeight(50)}
            marginTop={scaleHeight(10)}
            borderRadius={8}
            backgroundColor={COLOR.mainColor}
            borderColor="#CFCFCF"
            borderWidth={0.5}
            fontSize={13}
            fontFamily="medium"
            color="white"
            title="Đăng tin"
            onPress={handlePost}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PostingDetail;
