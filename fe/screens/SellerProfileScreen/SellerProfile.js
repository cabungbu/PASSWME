import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import styles from "./SellerProfileStyle";
import PWMBackground from "../../assets/passwmeBackground.png";
import { COLOR } from "../../assets/constant/color";
import CustomButton from "../../components/customButton";
import RenderTabBar from "../../components/RenderTabBar";
import { TabView, SceneMap } from "react-native-tab-view";
import RelativePost from "../postsDisplay/relativePost/RelativePost";
import { BE_ENDPOINT } from "../../settings/localVars";
import { navigateToChat } from "../../services/navigateToChat";

const ActiveScreen = ({ posts }) => {
  const activePosts = posts.filter((post) => post.status === "active");
  return (
    <View style={{ flex: 1 }}>
      <RelativePost posts={activePosts} />
    </View>
  );
};

const ClosedScreen = ({ posts }) => {
  const closedPosts = posts.filter((post) => post.status === "closed");
  return (
    <View style={{ flex: 1 }}>
      <RelativePost posts={closedPosts} />
    </View>
  );
};

const SellerProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const route = useRoute();
  const seller = route.params?.seller;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [sellerData, setSellerData] = useState(seller);
  const refreshTokenRedux = useSelector((state) => state.auth.refreshToken);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (sellerData?.followers && user?.id) {
      setIsFollowing(sellerData.followers.includes(user.id));
    }
  }, [sellerData?.followers, user?.id]);
  useEffect(() => {
    const fetchAllUserPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          BE_ENDPOINT + `/user/getUserById/${seller?.id}`
        );
        const postsData = res.data.posts || [];
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error.response?.data?.message);
        Alert.alert("Lỗi", "Không thể tải bài đăng");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUserPosts();
  }, [seller?.id]);
  const handleFollowToggle = async () => {
    try {
      const response = await fetch(
        `${BE_ENDPOINT}/user/${isFollowing ? "unfollow" : "follow"}/${
          seller.id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to toggle follow status");
      }

      const data = await response.json();
      if (data) {
        setIsFollowing(!isFollowing);
        // Refresh seller data
        const refreshResponse = await fetch(
          `${BE_ENDPOINT}/user/getUserById/${seller.id}`
        );
        const refreshedData = await refreshResponse.json();
        setSellerData(refreshedData);
      }
    } catch (error) {
      console.error("Error toggling follow:", error.message);
      Alert.alert(
        "Lỗi",
        isFollowing ? "Không thể hủy theo dõi" : "Không thể theo dõi"
      );
    }
  };

  const handleEdit = async () => {
    setMenuVisible((prev) => !prev);
  };

  const handleClosePost = async () => {
    setMenuVisible((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleOpenChat = async () => {
    await navigateToChat({
      navigation,
      senderId: user.id,
      recipientId: seller.id,
      recipientName: seller.username,
      recipientAvatar: seller.avatar || "",
    });
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "active", title: "Đang hiển thị" },
    { key: "closed", title: "Ngừng kinh doanh" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "active":
        return <ActiveScreen posts={posts} />;
      case "closed":
        return <ClosedScreen posts={posts} />;
      default:
        return null;
    }
  };

  const renderTabBar = RenderTabBar({
    scroll: false,
    fontSize: 14,
    padding: 5,
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          name="chevron-back"
          size={scaleWidth(30)}
          color={"black"}
          style={{
            paddingTop: scaleHeight(40),
          }}
        />
        <Image source={PWMBackground} style={styles.PWMBackground} />
        <View style={{ paddingTop: scaleHeight(40) }}>
          <Feather
            name="more-vertical"
            size={24}
            color="black"
            onPress={toggleMenu}
          />
          {isMenuVisible && (
            <View style={styles.menuContainer}>
              <TouchableOpacity onPress={handleEdit} style={styles.menuOption}>
                <Text style={styles.information}>Xem thông tin chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleClosePost}
                style={styles.menuOption}
              >
                <Text style={styles.information}>Tố cáo</Text>
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
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          padding: scaleWidth(15),
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {seller ? (
            <Image
              source={{ uri: seller.avatar }}
              style={{
                width: scaleHeight(64),
                height: scaleHeight(64),
                borderRadius: 100,
                resizeMode: "contain",
              }}
            />
          ) : (
            <ActivityIndicator />
          )}
          <View style={{ marginLeft: scaleWidth(15) }}>
            {seller ? (
              <Text style={styles.headerText}>{seller.username}</Text>
            ) : (
              <Text></Text>
            )}
            <Text style={styles.followsText}>
              {seller?.followers?.length} Người theo dõi {" | "}
              <Text>{seller?.posts?.length} Sản phẩm</Text>
            </Text>
          </View>
        </View>
        <View>
          <CustomButton
            width={scaleWidth(100)}
            height={20}
            borderRadius={5}
            fontSize={10}
            backgroundColor={COLOR.successColor}
            color="white"
            title={isFollowing ? "Đang theo dõi" : "Theo dõi"}
            onPress={handleFollowToggle}
          />
          <CustomButton
            width={scaleWidth(100)}
            height={20}
            borderRadius={5}
            fontSize={10}
            backgroundColor="white"
            color={COLOR.successColor}
            title="Trò chuyện"
            borderColor="#a0a0a0"
            borderWidth={0.8}
            marginTop={scaleHeight(10)}
            onPress={handleOpenChat}
          />
        </View>
      </View>
      <TabView
        style={{ marginTop: 10 }}
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default SellerProfile;
