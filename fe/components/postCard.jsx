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
import { scaleHeight, scaleWidth } from "../assets/constant/responsive";
import { useNavigation } from "@react-navigation/native";

const PostCard = React.memo(({ post }) => {
  const [products, setProduct] = useState(post.products);
  const navigation = useNavigation(); 
  const getProvince = (address) => {
    if (!address) return ""; // Nếu address không tồn tại, trả về chuỗi rỗng
  
    const addressParts = address.split(",");
    
    // Lấy phần đầu tiên của địa chỉ và loại bỏ khoảng trắng đầu cuối
    let firstPart = addressParts[0].trim();
    
    // Kiểm tra nếu phần đầu tiên là "Thành phố" hoặc "Tỉnh"
    if (firstPart.startsWith("Thành phố")) {
      // Lấy phần sau từ dấu cách để có tên thành phố
      return firstPart.replace("Thành phố", "").trim();
    }
  
    if (firstPart.startsWith("Tỉnh")) {
      // Lấy phần sau từ dấu cách để có tên tỉnh
      return firstPart.replace("Tỉnh", "").trim();
    }
  
    // Nếu không có điều kiện nào thỏa mãn, chỉ trả về phần đầu tiên
    return firstPart;
  };
  
  // Sử dụng hàm trong component
  const province = getProvince(post.address);
  
  


  const { minPrice, maxPrice } = useMemo(() => {
    console.log("check ",post.products)
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options); 
  };

  const moveToPostDetails = () => {
    navigation.navigate("PostDetail", { postId: post.id });
  };

  return (
    <TouchableOpacity
      style={styles.container_card}
      onPress={() => {
        moveToPostDetails();
      }}
    >
      {post.images ? (
        <Image source={{ uri: post.images[0] }} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )}
      <View style={{ marginHorizontal: 5 }}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {post.title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {renderPrice()}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="clock-time-eight-outline"
            size={16}
            color="#737373"
            style={{ marginRight: 2 }}
          />
          <Text style={styles.start}>{formatDate(post.start)} {province ? `- ${province}` : ""}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
export default PostCard;

const styles = StyleSheet.create({
  container_card: {
    width: scaleWidth(205),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 5,
    marginBottom: 5,
    overflow: "hidden"
  },
  image: {
    width: scaleWidth(205),
    height: scaleWidth(150),
    resizeMode: "cover",
  },
  title: {
    fontSize: 13,
    marginVertical: 5,
    fontFamily: "regular",
    height: scaleHeight(40),
  },
  start: {
    fontSize: 11,
    marginVertical: 5,
    color: "#737373",
    fontFamily: "regular",
  },
  price: {
    fontSize: 13,
    paddingLeft: 5,
    color: "#E30414",
    fontFamily: "semibold",
  },
});
