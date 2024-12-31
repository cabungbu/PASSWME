import React from "react";
import { View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { scaleWidth } from "../assets/constant/responsive";

const FeedbackStars = ({ rating }) => {
  // Tạo mảng sao đầy đủ và sao rỗng
  const filledStars = Array(rating).fill(
    <FontAwesome name="star" size={20} color="#FFC827" style={{marginRight: scaleWidth(5)}}/>
  );
  const emptyStars = Array(5 - rating).fill(
    <FontAwesome name="star-o" size={20} color="#FFC827" style={{marginRight: scaleWidth(5)}}/>
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {filledStars.map((star, index) => (
        <View key={`filled-star-${index}`}>{star}</View>
      ))}
      {emptyStars.map((star, index) => (
        <View key={`empty-star-${index}`}>{star}</View>
      ))}
    </View>
  );
};

export default FeedbackStars;
