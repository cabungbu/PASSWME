import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIfShopcartUpdate,
  getUserShopcart,
} from "../../redux/shopCartService";
import RenderContent from "./renderContent/RenderContent";
import FooterBuy from "./Footer/FooterBuy";
import FooterDelete from "./Footer/FooterDelete";
import { useNavigation } from "@react-navigation/native";
import { isEqual } from "lodash";
import styles from "./style";
import { shallowEqual } from "react-redux";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import ProductBottom from "../PostDetailScreen/productBottomSheet/ProductBottom";
import { BE_ENDPOINT } from "../../settings/localVars";
const CartScreen = () => {
  const navigation = useNavigation();
  const [isSua, setIsSua] = useState(false);
  const [productIdBefore, setProductIdBefore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Memoize selector để tránh re-render không cần thiết

  // Sử dụng useCallback cho các hàm callback
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const toggleSua = useCallback(() => {
    setIsSua((prev) => !prev);
  }, []);

  // Memoize các component con
  const MemoizedRenderContent = useMemo(() => <RenderContent />, []);

  const Footer = useMemo(
    () => (isSua ? <FooterDelete /> : <FooterBuy />),
    [isSua]
  );

  const bottomSheetRef = useRef(null);

  const ContentRef = React.forwardRef((props, ref) => {
    return <Text innerRef={ref}>Đang tải...</Text>;
  });

  const [contentHeight, setContentHeight] = useState(0);
  const [post, setPost] = useState(null);
  const handlePresentModalPress = (post) => {
    setPost(null);
    const fetchPost = async () => {
      try {
        requestAnimationFrame(() => {
          // Mở bottom sheet

          if (bottomSheetRef.current) {
            bottomSheetRef.current.snapToIndex(0);
          }
        });
        const response = await fetch(
          `${BE_ENDPOINT}/post/getPostById/${post.postId}/`
        );
        const data = await response.json();
        setPost(data);
        setProductIdBefore(post.product.productId);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
    console.log("Đã mở");
  };
  const handleSheetChanges = useCallback((index) => {}, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );
  useEffect(() => {
    const measureHeight = () => {
      if (ContentRef.current) {
        ContentRef.current.measure((x, y, width, height) => {
          setContentHeight(height);
        });
      }
    };

    // Nếu post đã được load, measure height
    if (post) {
      // Sử dụng requestAnimationFrame để đảm bảo layout đã được render
      requestAnimationFrame(measureHeight);
    }
  }, [post]);

  const renderPostContent = () => {
    if (post === null)
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 50,
          }}
        >
          <ActivityIndicator size="large" color="#A0A0A0" />
        </View>
      );

    return (
      <BottomSheetView
        ref={ContentRef}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setContentHeight(height);
        }}
      >
        <ProductBottom
          products={post.products}
          post={post}
          isUpdate={true}
          productIdBefore={productIdBefore}
        />
      </BottomSheetView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={true}
      />
      <View
        style={
          Platform.OS === "android" ? styles.headerAndroid : styles.headerIOS
        }
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={Platform.OS === "android" ? "white" : "#E30414"}
          onPress={handleGoBack}
        />
        <Text
          style={
            Platform.OS === "android" ? styles.headerText : styles.headerTextIOS
          }
        >
          Giỏ hàng
        </Text>
        <TouchableOpacity onPress={toggleSua}>
          <Text style={styles.sua}>{isSua ? "Xong" : "Sửa"}</Text>
        </TouchableOpacity>
      </View>

      <RenderContent onAddPress={(post) => handlePresentModalPress(post)} />
      {Footer}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        // snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        style={{ zIndex: 5, elevation: 5 }}
      >
        <View style={{ padding: 1 }}>{renderPostContent()}</View>
      </BottomSheet>
    </View>
  );
};
export default CartScreen;
