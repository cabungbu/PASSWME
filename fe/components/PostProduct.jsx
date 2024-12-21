import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import ImageAddIcon from "../assets/icons/ImageAddIcon";
import Feather from "@expo/vector-icons/Feather";
import { scaleHeight, scaleWidth } from "../assets/constant/responsive";

const PostProduct = ({
  onChangeName,
  onChangePrice,
  onChangeQuantity,
  onChangeImage,
}) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [5, 6],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onChangeImage(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    setImage(null);
    onChangeImage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {image ? (
          <View style={styles.border_imgIcon}>
            <Image
              source={{ uri: image }}
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
              onPress={deleteImage}
            />
          </View>
        ) : (
          <View style={styles.border_imgIcon}>
            <ImageAddIcon strokeColor="white" size={35} />
            <Feather
              name="plus"
              size={20}
              color="black"
              style={styles.delete_imgAndVideo}
              onPress={pickImage}
            />
          </View>
        )}
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          keyboardType="numeric"
          placeholder="Giá"
          onChangeText={(text) => {
            onChangePrice(text);
          }}
        />
        <TextInput
          style={[styles.textInput, { width: scaleWidth(80) }]}
          keyboardType="numeric"
          placeholder="Số lượng"
          onChangeText={(text) => {
            onChangeQuantity(text);
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Tên sản phẩm"
          onChangeText={(text) => {
            onChangeName(text);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    marginVertical: scaleHeight(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    fontFamily: "regular",
    borderBottomWidth: 1,
    borderColor: "#a0a0a0",
    marginTop: scaleHeight(10),
    marginLeft: scaleWidth(10),
  },
  border_imgIcon: {
    height: scaleHeight(60),
    width: scaleWidth(50),
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  delete_imgAndVideo: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 100,
  },
});

export default PostProduct;
