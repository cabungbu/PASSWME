import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import styles from "./PostStyle";
import { BE_ENDPOINT } from "../../settings/localVars";

import MotobikeIcon from "../../assets/icons/MotobikeIcon";
import ComputorIcon from "../../assets/icons/ComputorIcon";
import PetIcon from "../../assets/icons/PetIcon";
import DrinkAndFoodIcon from "../../assets/icons/DrinkAndFoodIcon";
import FridgeIcon from "../../assets/icons/FridgeIcon";
import HorizontalCategory from "../../components/HorizontalCategory";
import ChairIcon from "../../assets/icons/ChairIcon";
import BabyCarriageIcon from "../../assets/icons/BabyCarriageIcon";
import GameIcon from "../../assets/icons/GameIcon";
import SewingMachineIcon from "../../assets/icons/SewingMachineIcon";
import ShirtIcon from "../../assets/icons/ShirtIcon";

const Post = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(BE_ENDPOINT + "/category/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.response?.data?.message);
      });
  }, []);

  const iconMap = {
    "Xe cộ": MotobikeIcon,
    "Thiết bị điện tử": ComputorIcon,
    "Thú cưng": PetIcon,
    "Thực phẩm, nước uống": DrinkAndFoodIcon,
    "Đồ gia dụng": FridgeIcon,
    "Đồ nội thất": ChairIcon,
    "Mẹ và bé": BabyCarriageIcon,
    "Thời trang, đồ dùng cá nhân": ShirtIcon,
    "Giải trí, thể thao, sở thích": GameIcon,
    "Văn phòng phẩm, công nông nghiệp": SewingMachineIcon,
  };

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Quản lý tin đăng</Text>
      </View>
      <Text style={styles.label}>Chọn danh mục: </Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        {categories.map((category) => {
          const IconComponent = iconMap[category.nameOfCategory];
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => { //PostingDetailScreen
                navigation.navigate("PostingDetailScreen", { 
                  categoryId: category.id,
                  categoryName: category.nameOfCategory,
                });
              }}
            >
              {IconComponent ? (
                <HorizontalCategory
                  key={category.id}
                  Category={category.nameOfCategory}
                  IconComponent={IconComponent}
                />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Post;
