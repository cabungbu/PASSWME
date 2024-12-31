import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ImageSection from "./imageSection";
import { BE_ENDPOINT } from "../../settings/localVars";
import { ActivityIndicator } from "react-native";
import styles from "./style";
import DataSection from "./dataPostSection";
import BottomTabSection from "./BottomTabSection/bottomTabSection";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import ShoppingCartIcon from "../../components/shoppingCartIcon";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import ProductBottom from "./productBottomSheet/ProductBottom";
import { navigateToChat } from "../../services/navigateToChat";
import { useSelector } from "react-redux";
export default function PostDetailScreen({ route }) {
  const user = useSelector((state) => state.auth.user);
  const { postId } = route.params;
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isBuy, setIsBuy] = useState(false);
  // variables
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const handleOpenChat = async () => {
    await navigateToChat({
      navigation,
      senderId: user.id,
      recipientId: post?.owner.id,
      recipientName: post?.owner.username,
      recipientAvatar: post?.owner.avatar || "",
      // updateLastMessage: (chatRoomId, lastMessage) => {
      //   // Optional: Cập nhật last message nếu cần
      // }
    });
  };

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    if (bottomSheetRef.current && contentHeight > 0) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [contentHeight]);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsSheetVisible(false); // Ẩn màu nền mờ
  }, []);

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
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${BE_ENDPOINT}/post/getPostById/${postId}/`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", textAlignVertical: "center" }}>
          Không tìm thấy thông tin bài đăng
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? (
        <>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
        </>
      ) : (
        <>
          <StatusBar barStyle="light-content" />
          <View
            style={{ height: 44, width: "100%", backgroundColor: "#E30414" }}
          />
        </>
      )}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.cartIconContainer}>
          <ShoppingCartIcon cartColor={"black"} size={24} />

          <Feather name="more-vertical" size={24} color="black" />
        </View>
      </View>

      <View style={{ flex: 1 }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
      >
        <ImageSection images={post.images} post={post} />
        <DataSection post={post} />
      </ScrollView>
    </View>


      <BottomTabSection
        onBuyNow={() => {
          handlePresentModalPress(), setIsBuy(true);
        }}
        onAddPress={handlePresentModalPress}
        onChatPress={handleOpenChat}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        // snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        style={{ zIndex: 5, elevation: 5 }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            backgroundColor: "white",
            zIndex: 10,
          }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setContentHeight(height);
          }}
        >
          <ProductBottom
            products={post.products}
            post={post}
            isUpdate={false}
            isBuy={isBuy}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
