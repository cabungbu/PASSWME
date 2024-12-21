import React, { useCallback, useState, useEffect } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import các icon
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Import các màn hình
import Home from "../screens/HomeScreen/Home";
import MyStore from "../screens/MyStoreScreen/MyStore";
import Post from "../screens/PostScreen/Post";
import Chat from "../screens/ChatScreen/Chat";
import Profile from "../screens/ProfileScreen/Profile";
import Setting from "../screens/ProfileScreen/SettingScreen/Setting";
import MyRatings from "../screens/ProfileScreen/MyRatingsScreen/MyRatings";
import OrderStatus from "../screens/ProfileScreen/OrderStatusScreen/OrderStatus";

import PostsDisplay from "../screens/postsDisplay/mainSection/PostsDisplay";
import WelcomePage from "../screens/WelcomeScreen/welcome";
import LoginPage from "../screens/Login/Login";
import PostDetailScreen from "../screens/PostDetailScreen/PostDetailScreen";
import CartScreen from "../screens/CartScreen/CartScreen";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../assets/constant/color";
import RegisterPage from "../screens/Register/register";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../redux/authSlice";
import UpdateInformation from "../screens/ProfileScreen/SettingScreen/UpdateInformationScreen";
import PostingDetail from "../screens/PostScreen/PostingScreen/PostingDetail";
import Posted from "../screens/PostScreen/PostedScreen/Posted";
import { getUserShopcart } from "../redux/shopCartService";
import CheckOut from "../screens/CheckOutScreen/CheckOut";
import CheckOut2 from "../screens/CheckOutScreen/CheckOut2";
import OrderSuccess from "../screens/OrderSuccessScreen/orderSuccess";
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const MyStoreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyStoreScreen" component={MyStore} />
    </Stack.Navigator>
  );
};

const PostStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostScreen" component={Post} />
    </Stack.Navigator>
  );
};

function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatScreen" component={Chat} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
    </Stack.Navigator>
  );
}

const _renderIcon = (routeName, selectedTab) => {
  let icon = "";

  switch (routeName) {
    case "title1": // Home
      return (
        <AntDesign
          name="home"
          size={25}
          color={routeName === selectedTab ? "white" : COLOR.disableWhiteColor}
        />
      );
    case "title2": // Store
      return (
        <Ionicons
          name="storefront"
          size={25}
          color={routeName === selectedTab ? "white" : COLOR.disableWhiteColor}
        />
      );
    case "title3": // Post
      return (
        <MaterialIcons
          name="post-add"
          size={25}
          color={routeName === selectedTab ? COLOR.mainColor : "black"}
        />
      );
    case "title4": // Chat
      return (
        <Ionicons
          name="chatbubble-ellipses"
          size={25}
          color={routeName === selectedTab ? "white" : COLOR.disableWhiteColor}
        />
      );
    case "title5": // Profile
      return (
        <Ionicons
          name="person"
          size={25}
          color={routeName === selectedTab ? "white" : COLOR.disableWhiteColor}
        />
      );
    default:
      return null; // Trả về null nếu không khớp với bất kỳ route nào
  }
};

const getTabLabel = (routeName) => {
  switch (routeName) {
    case "title1":
      return "Home";
    case "title2":
      return "Store";
    case "title3":
      return "Post";
    case "title4":
      return "Chat";
    case "title5":
      return "Profile";
    default:
      return "";
  }
};

function BottomBar() {
  const navigation = useNavigation();

  const handleTabPress = useCallback(
    (routeName) => {
      navigation.navigate(routeName);
    },
    [navigation]
  );

  const renderTabBar = useCallback(
    ({ routeName, selectedTab }) => {
      return (
        <TouchableOpacity
          onPress={() => handleTabPress(routeName)}
          style={styles.tabbarItem}
        >
          {_renderIcon(routeName, selectedTab)}
          {routeName === selectedTab && (
            <Text
              style={{
                color: "white",
                marginTop: 2,
                fontFamily: "medium",
                fontSize: 12,
                fontFamily: "regular",
              }}
            >
              {getTabLabel(routeName)}
            </Text>
          )}
        </TouchableOpacity>
      );
    },
    [handleTabPress]
  );

  return (
    <CurvedBottomBarExpo.Navigator
      screenOptions={{ headerShown: false }}
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={60}
      circleWidth={55}
      bgColor="#E30414"
      initialRouteName="title1"
      borderTopLeftRight
      renderCircle={({ selectedTab }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTabPress("title3")}
          >
            {_renderIcon("title3", selectedTab)}
            {"title3" === selectedTab && (
              <Text
                style={{
                  color: COLOR.mainColor,
                  marginTop: 2,
                  fontFamily: "medium",
                  fontSize: 14,
                }}
              >
                Post
              </Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBarExpo.Screen
        name="title1"
        position="LEFT"
        component={HomeStack}
      />
      <CurvedBottomBarExpo.Screen
        name="title2"
        component={MyStoreStack}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen
        name="title3"
        component={PostStack}
        position="CENTER"
      />
      <CurvedBottomBarExpo.Screen
        name="title4"
        position="RIGHT"
        component={ChatStack}
      />
      <CurvedBottomBarExpo.Screen
        name="title5"
        position="RIGHT"
        component={ProfileStack}
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

export default function MainContainer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          dispatch(setUser(parsedUser));

          // Check if user is defined before calling getUserShopcart
          if (parsedUser && parsedUser.id) {
            await getUserShopcart(parsedUser.id, dispatch);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false); // Đánh dấu đã load xong
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
        </>
      ) : (
        <>
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="PostDetail" component={PostDetailScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="SettingScreen" component={Setting} />
          <Stack.Screen name="MyRatingsScreen" component={MyRatings} />
          <Stack.Screen name="OrderStatusScreen" component={OrderStatus} />
          <Stack.Screen name="PostsDisplay" component={PostsDisplay} />
          <Stack.Screen
            name="UpdateInformation"
            component={UpdateInformation}
          />
          <Stack.Screen name="PostingDetailScreen" component={PostingDetail} />
          <Stack.Screen name="PostedScreen" component={Posted} />
          <Stack.Screen name="CheckOut" component={CheckOut} />
          <Stack.Screen name="CheckOut2" component={CheckOut2} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        </>
      )}
    </Stack.Navigator>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 70,
    height: 70,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    bottom: 40,
    shadowColor: COLOR.mainColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
});
