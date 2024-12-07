import {
  View,
  Text,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { COLOR } from "../../../assets/constant/color";
import { scaleWidth } from "../../../assets/constant/responsive";
import { useNavigation } from "@react-navigation/native";

const RelativePost = React.memo(({ posts }) => {
  console.log(posts);
  return (
    <View>
      <Text>Post Liên quan </Text>
    </View>
  );
});

export default RelativePost;
