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
import { COLOR } from "../../assets/constant/color";
import { scaleWidth } from "../../assets/constant/responsive";
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
import { shallowEqual } from "react-redux";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import ProductBottom from "../PostDetailScreen/productBottomSheet/ProductBottom";
import { BE_ENDPOINT } from "../../settings/localVars";
import mainStyles from "../../styles/mainStyles";
import Feather from "@expo/vector-icons/Feather";

const CartScreen = () => {
  const navigation = useNavigation();
  const [isFix, setIsFix] = useState(false);
  const [productIdBefore, setProductIdBefore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Memoize selector để tránh re-render không cần thiết

  // Sử dụng useCallback cho các hàm callback
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const toggleFix = useCallback(() => {
    setIsFix((prev) => !prev);
  }, []);

  // Memoize các component con
  const MemoizedRenderContent = useMemo(() => <RenderContent />, []);

  const Footer = useMemo(
    () => (isFix ? <FooterDelete /> : <FooterBuy />),
    [isFix]
  );

  const bottomSheetRef = useRef(null);

  const ContentRef = React.forwardRef((props, ref) => {
    return <Text>Đang tải...</Text>;
  });

  const [contentHeight, setContentHeight] = useState(0);
  const [post, setPost] = useState(null);
  const handlePresentModalPress = (post) => {
    setPost(null);
    console.log("mở");
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
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View
        style={
          Platform.OS === "android" ? mainStyles.headerCenterContainer : styles.headerIOS
        }
      >
        <Ionicons
          name="chevron-back"
          size={scaleWidth(28)}
          color={Platform.OS === "android" ? "white" : "#E30414"}
          onPress={handleGoBack}
          style={mainStyles.headerIcon}
        />
        <Text
          style={
            Platform.OS === "android" ? mainStyles.headerCenterText : styles.headerTextIOS
          }
        >
          Giỏ hàng
        </Text>
        <Feather name="more-vertical" size={scaleWidth(25)} color={isFix? "white" : COLOR.disableWhiteColor} style={mainStyles.headerIcon}  onPress={toggleFix}/>
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
