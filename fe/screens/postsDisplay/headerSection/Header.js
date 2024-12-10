import {
  View,
  Text,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import ShoppingCartIcon from "../../../components/shoppingCartIcon";

import { COLOR } from "../../../assets/constant/color";
import { scaleWidth } from "../../../assets/constant/responsive";

const Header = React.memo(() => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ width: "100%", backgroundColor: COLOR.mainColor }}>
      {Platform.OS === "android" ? (
        <>
          <StatusBar
            barStyle="light-content"
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
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.inputContainer}>
          <Feather name="search" size={24} color="red" />
          <TextInput
            placeholder="Tìm kiếm"
            style={{ marginLeft: scaleWidth(10), fontFamily: "regular" }}
          />
        </View>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Feather name="filter" size={24} color="white" />
          <View style={styles.numberOfNoti}>
            <Text
              style={{
                fontFamily: "medium",
                fontSize: 10,
                color: COLOR.mainColor,
              }}
            >
              5
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

export default Header;
