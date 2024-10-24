import React, { useCallback } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
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
import WelcomePage from "../screens/WelcomeScreen/welcome";
import LoginPage from "../screens/Login/Login";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../assets/constant/color";
import RegisterPage from "../screens/Register/register";
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

const renderTabBar = ({ routeName, selectedTab, navigate }) => {
  return (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabbarItem}
    >
      {_renderIcon(routeName, selectedTab)}
      {routeName === selectedTab && ( // Chỉ hiển thị tabLabel khi tab được chọn
        <Text
          style={{
            color: "white",
            marginTop: 2,
            fontFamily: "medium",
            fontSize: 14,
          }}
        >
          {getTabLabel(routeName)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// function BottomBar() {
//   return (
//     <CurvedBottomBarExpo.Navigator
//       screenOptions={{ headerShown: false }}
//       type="DOWN"
//       style={styles.bottomBar}
//       shadowStyle={styles.shawdow}
//       height={60}
//       circleWidth={55}
//       bgColor="#E30414"
//       initialRouteName="title1"
//       borderTopLeftRight
//       renderCircle={({ selectedTab, navigate }) => (
//         <Animated.View style={styles.btnCircleUp}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigate("title3")}
//           >
//             {_renderIcon("title3", selectedTab)}
//             {"title3" === selectedTab && ( // Chỉ hiển thị tabLabel khi tab được chọn
//               <Text
//                 style={{
//                   color: COLOR.mainColor,
//                   marginTop: 2,
//                   fontFamily: "medium",
//                   fontSize: 14,
//                 }}
//               >
//                 Post
//               </Text>
//             )}
//           </TouchableOpacity>
//         </Animated.View>
//       )}
//       tabBar={renderTabBar}
//     >
//       <CurvedBottomBarExpo.Screen
//         name="title1"
//         position="LEFT"
//         component={() => <HomeStack />}
//       />
//       <CurvedBottomBarExpo.Screen
//         name="title2"
//         component={() => <MyStoreStack />}
//         position="LEFT"
//       />
//       <CurvedBottomBarExpo.Screen
//         name="title3"
//         component={() => <PostStack />}
//         position="CENTER"
//       />
//       <CurvedBottomBarExpo.Screen
//         name="title4"
//         position="RIGHT"
//         component={() => <ChatStack />}
//       />
//       <CurvedBottomBarExpo.Screen
//         name="title5"
//         position="RIGHT"
//         component={() => <ProfileStack />}
//       />
//     </CurvedBottomBarExpo.Navigator>
//   );
// }
function BottomBar() {
  const navigation = useNavigation(); // Thêm hook này

  const handleTabPress = useCallback(
    (routeName) => {
      navigation.navigate(routeName);
    },
    [navigation]
  );

  const renderTabBar = useCallback(
    ({ routeName, selectedTab, navigate }) => {
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
                fontSize: 14,
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
      renderCircle={({ selectedTab, navigate }) => (
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
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="BottomBar" component={BottomBar} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
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
  screen1: {
    flex: 1,
    backgroundColor: "#BFEFFF",
  },
  screen2: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
});
