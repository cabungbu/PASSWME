import React from "react";
import { 
    View, 
    Text, 
    StyleSheet 
} from "react-native";

import { scaleHeight, scaleWidth } from "../assets/constant/responsive";

import Ionicons from "@expo/vector-icons/Ionicons";

const HorizontalCategory = ({
  Category = "Category",
  iconSize = scaleWidth(35),
  IconComponent,
}) => {
  return (
    <View style={styles.horizontalCategory_Container}>
      {IconComponent && <IconComponent size={iconSize} />}
      <Text style={[styles.category]}>{Category}</Text>
      <Ionicons
        name="chevron-forward-outline"
        size={scaleWidth(25)}
        color='black'
        style={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalCategory_Container: {
    width: "100%",
    height: 'auto',
    backgroundColor: 'white',
    flexDirection: "row",
    alignItems: "flex-end",
    padding: scaleWidth(20),
    marginBottom: scaleHeight(2),
    borderRadius: 5
  },
  category: {
    fontFamily: "medium",
    fontSize: 16,
    color: "black",
    marginLeft: scaleWidth(25),
    flex: 1
  },
});

export default HorizontalCategory;
