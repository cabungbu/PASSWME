import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styles from "./style";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../../assets/constant/color";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function ImageSection({ images, post }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const flatListRef = useRef(null);
  const allImages = [
    ...images,
    ...post.products.map((product) => product.image),
  ];
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          height: 300,
        }}
      >
        <Image
          source={{ uri: item }}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
          onError={(e) => {
            console.error("Image load error:", e.nativeEvent);
          }}
        />
      </View>
    );
  };
  const handlePageChange = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const currentPage = Math.floor(contentOffset.x / layoutMeasurement.width);
    if (currentPage <= images.length) {
      setSelectedProduct(null);
    } else {
      currentPage > images.length;
    }
    {
      setSelectedProduct(post.products[currentPage - images.length]);
    }
    setCurrentIndex(currentPage);
  };
  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedProduct(item);
        setCurrentIndex(images.length + index);
        flatListRef.current?.scrollToIndex({
          index: images.length + index,
          animated: true,
        });
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={[
          { width: 50, height: 50, marginRight: 10 },
          selectedProduct?.image === item.image && {
            borderWidth: 1,
            borderColor: COLOR.mainColor,
          },
        ]}
      />
    </TouchableOpacity>
  );

  const { minPrice, maxPrice } = useMemo(() => {
    if (!post.products || post.products.length === 0) {
      return { minPrice: 0, maxPrice: 0 };
    }

    const prices = post.products.map((product) => product.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [post.products]);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderPrice = () => {
    if (!post.products || post.products.length === 0) {
      return <Text>Liên hệ</Text>;
    }

    if (selectedProduct != null) {
      return (
        <Text style={styles.price}>{formatPrice(selectedProduct.price)}đ</Text>
      );
    }

    if (post.products.length === 1) {
      return (
        <Text style={styles.price}>{formatPrice(post.products[0].price)}đ</Text>
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
    <>
      <View style={{ width: "100%", position: "relative" }}>
        <View style={styles.imageCounter}>
          <Text style={styles.imageCounterText}>
            {currentIndex + 1}/{allImages.length}
          </Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={allImages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handlePageChange}
          initialScrollIndex={selectedProduct ? currentIndex : 0}
        />
      </View>

      <View style={{ paddingLeft: 15, backgroundColor: "white" }}>
        <Text style={styles.productCount}>
          {post.products.length} phân loại
        </Text>
        <FlatList
          data={post.products}
          renderItem={renderProductItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        <View style={{ marginVertical: 10 }}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {renderPrice()}
          </Text>
        </View>
      </View>
    </>
  );
}
