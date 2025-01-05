import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { scaleHeight, scaleWidth } from "../assets/constant/responsive";
import CustomButton from "./customButton";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../assets/constant/color";
import axios from "axios";
import { BE_ENDPOINT } from "../settings/localVars";

export default function ActiveListingCard({ post, isActive }) {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isUse, setIsUse] = useState("Đẩy tin đề xuất");
  const handleClick = async () => {
    const check = await fetch(BE_ENDPOINT + "/servicePost/get/" + post.id);

    console.log("hihi" + check);
    if (check.status === 200) {
      Alert.alert(
        "Đẩy tin đề xuất hiệu lực 48h",
        "Dịch vụ được thanh toán bằng Momo, bạn có chắc muốn thanh toán?",
        [
          {
            text: "Có",
            onPress: () => navigation.navigate("Payment", { postId: post.id }),
          },
          { text: "Không", style: "cancel" },
        ]
      );
    } else {
      alert("Tin này đang dùng dịch vụ đẩy tin");
      setIsUse("Đang được đẩy tin");
    }
  };
  const [products, setProduct] = useState(post.products);

  const handleEdit = async () => {
    // Thực hiện hành động chỉnh sửa
    navigation.navigate("PostingDetailScreen", {
      categoryId: post.categoryId,
      categoryName: post.categoryName,
      isEditing: true,
      postData: post,
    });
  };

  const handleClosePost = async () => {
    try {
      await axios.patch(`${BE_ENDPOINT}/post/updatePost/${post.id}`, {
        status: "closed",
      });
      setMenuVisible(false);
    } catch (error) {
      console.error("Error closing post:", error);
      // Hiển thị thông báo lỗi nếu cần
    }
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options); // Trả về định dạng DD/MM/YYYY
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

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderPrice = () => {
    if (!products || products.length === 0) {
      return <Text>Liên hệ</Text>;
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

  return (
    <View style={styles.container_card}>
      <View style={styles.horizontalSpacerContainer}>
        <View style={{ flexDirection: "row" }}>
          {post.images ? (
            <Image source={{ uri: post.images[0] }} style={styles.image} />
          ) : (
            <Text>No image available</Text>
          )}
          <View style={styles.information}>
            <Text style={[styles.price, { color: "black" }]}>{post.title}</Text>
            <Text style={styles.price}>{renderPrice()}</Text>
            <Text style={styles.textInfor}>
              Ngày đăng: {formatDate(post.start)}
            </Text>
            <Text style={styles.textInfor}>
              Sản phẩm:{" "}
              {post.products.map((product) => product.name).join(", ")}
            </Text>
          </View>
        </View>
        {isActive && (
          <View>
            <Feather
              name="more-vertical"
              size={24}
              color="black"
              onPress={toggleMenu}
            />
            {isMenuVisible && (
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  onPress={handleEdit}
                  style={styles.menuOption}
                >
                  <Text style={styles.information}>Chỉnh sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClosePost}
                  style={styles.menuOption}
                >
                  <Text style={styles.information}>Ngừng kinh doanh</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setMenuVisible(false)}
                  style={styles.menuOption}
                >
                  <Text style={styles.information}>Đóng</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
      {isActive && (
        <View style={[styles.horizontalSpacerContainer, { marginTop: scaleHeight(10)}]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="grey"
            />
            <Text style={styles.textInfor}>Thông tin</Text>
          </View>
          <CustomButton
            width={scaleWidth(160)}
            height={scaleHeight(40)}
            borderRadius={8}
            backgroundColor="transparent"
            borderColor="#CFCFCF"
            borderWidth={0.5}
            fontSize={13}
            fontFamily="medium"
            color="black"
            title="Đẩy tin đề xuất"
            onPress={handleClick}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container_card: {
    width: "100%",
    height:"auto",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(15),
  },
  horizontalSpacerContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: scaleWidth(90),
    height: scaleWidth(90),
    marginRight: scaleWidth(20),
    resizeMode: "cover",
    borderRadius: 15,
    borderColor: "black",
  },
  information: {
    fontSize: 13,
    fontFamily: "medium",
    color: "black",
  },
  menuContainer: {
    position: "absolute",
    top: 30,
    right: 0,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  menuOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: "#CFCFCF",
    width: scaleWidth(200)
  },
  textInfor: {
    fontFamily: "regular",
    fontSize: 13,
    color: "black",
  },
  price: {
    fontFamily: "medium",
    fontSize: 14,
    color: COLOR.mainColor,
  },
});
