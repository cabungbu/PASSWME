import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { scaleWidth } from "../assets/constant/responsive";

const InteractiveStars = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0); // Mặc định 1 sao

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((index) => (
        <TouchableOpacity
          key={`star-${index}`}
          onPress={() => handleStarPress(index)}
          style={{ marginRight: scaleWidth(5) }}
        >
          <FontAwesome
            name={index <= rating ? "star" : "star-o"}
            size={20}
            color="#FFC827"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default InteractiveStars;