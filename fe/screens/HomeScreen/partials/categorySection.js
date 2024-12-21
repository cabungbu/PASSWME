import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { SvgUri } from "react-native-svg";
import styles from "./style";
import { BE_ENDPOINT } from "../../../settings/localVars";

import ComputorIcon from "../../../assets/icons/ComputorIcon";
import PetIcon from "../../../assets/icons/PetIcon";
import DrinkAndFoodIcon from "../../../assets/icons/DrinkAndFoodIcon";
import FridgeIcon from "../../../assets/icons/FridgeIcon";
import ChairIcon from "../../../assets/icons/ChairIcon";
import BabyCarriageIcon from "../../../assets/icons/BabyCarriageIcon";
import ShirtIcon from "../../../assets/icons/ShirtIcon";
import GameIcon from "../../../assets/icons/GameIcon";
import SewingMachineIcon from "../../../assets/icons/SewingMachineIcon";
import MotobikeIcon from "../../../assets/icons/MotobikeIcon";
import AllCategoryIcon from "../../../assets/icons/AllCategoryIcon";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function CategorySection() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const numColumns = Math.ceil(categories.length / 2);
  const user = useSelector((state) => state.auth?.user);
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
    "Tất cả": AllCategoryIcon,
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
    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.coinContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SvgUri
            width={24}
            height={24}
            uri="https://firebasestorage.googleapis.com/v0/b/passwme-ec9f7.appspot.com/o/tabler_coin.svg?alt=media&token=602b1ca1-16d2-4674-9f51-e53c769cbef3"
          />
          <Text style={styles.coin}>{user.coin ? user.coin : 0}</Text>
        </View>
        <Text style={styles.coinText}>Nhấn để nhận xu mỗi ngày</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.categoriesContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flexDirection: "column" }}>
          {[0, 1].map((rowIndex) => (
            <View
              key={rowIndex}
              style={{
                flexDirection: "row",
                marginBottom: 8,
              }}
            >
              {categories
                .slice(rowIndex * numColumns, (rowIndex + 1) * numColumns)
                .map((item, index) => {
                  const IconComponent = iconMap[item.nameOfCategory];
                  return (
                    <View
                      key={index}
                      style={{
                        alignItems: "center",
                        width: 80,
                        marginRight: 10,
                        marginBottom: 10,
                      }}
                      onPress={() =>
                        navigation.navigate("PostsDisplay", {
                          categoryId: item.id,
                          categoryName: item.nameOfCategory,
                        })
                      }
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("PostsDisplay", {
                            categoryId: item.id,
                            categoryName: item.nameOfCategory,
                          })
                        }
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          backgroundColor: "#fff",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 8,
                        }}
                      >
                        {IconComponent ? <IconComponent size={25} /> : null}
                      </TouchableOpacity>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.categoryText}
                      >
                        {item.nameOfCategory}
                      </Text>
                    </View>
                  );
                })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
