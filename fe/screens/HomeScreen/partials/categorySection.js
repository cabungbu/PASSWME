import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { SvgUri } from "react-native-svg";
import styles from "./style";
import { BE_ENDPOINT } from "../../../settings/localVars";

export default function CategorySection() {
  const [categories, setCategories] = useState([]);

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

  // Chia categories thành 2 mảng con, mảng con 1 luôn >= mảng con 2
  const halfIndex = Math.ceil(categories.length / 2);
  const firstHalf = categories.slice(0, halfIndex);
  const secondHalf = categories.slice(halfIndex);

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

      <View style={{ flexDirection: "row" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}
          style={{ flex: 1 }}
        >
          {firstHalf.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                margin: 8,
              }}
            >
              <SvgUri width={24} height={24} uri={item.icon} />
              <Text style={styles.categoryText}>{item.nameOfCategory}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ flexDirection: "row" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}
          style={{ flex: 1 }}
        >
          {secondHalf.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                margin: 8,
              }}
            >
              <SvgUri width={24} height={24} uri={item.icon} />
              <Text style={styles.categoryText}>{item.nameOfCategory}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
