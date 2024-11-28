import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { SvgUri } from "react-native-svg";
import styles from "./style";
import { BE_ENDPOINT } from "../../../settings/localVars";

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const numColumns = Math.ceil(categories.length / 2);
  useEffect(() => {
    fetch(BE_ENDPOINT + "/category/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

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
          <Text style={styles.coin}>500</Text>
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
                .map((item, index) => (
                  <View
                    key={index}
                    style={{
                      alignItems: "center",
                      width: 80,
                      marginRight: 10,
                      marginBottom: 10,
                    }}
                  >
                    <TouchableOpacity
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
                      <SvgUri width={24} height={24} uri={item.icon} />
                    </TouchableOpacity>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.categoryText}
                    >
                      {item.nameOfCategory}
                    </Text>
                  </View>
                ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
