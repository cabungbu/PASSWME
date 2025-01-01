import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
const PushPostService = () => {
  const route = useRoute();
  const { post } = route.params;
  return (
    <SafeAreaView>
      <Text>{post.title}</Text>
    </SafeAreaView>
  );
};
export default PushPostService;
