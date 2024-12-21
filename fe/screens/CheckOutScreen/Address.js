import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { COLOR } from "../../assets/constant/color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Address({ newUser }) {
  let user = useSelector((state) => state.auth?.user);
  if (newUser) {
    user = newUser;
  }
  const navigation = useNavigation();
  const changeAddress = () => {
    navigation.navigate("UpdateInformation", { isOrder: true });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => changeAddress()}>
      <FontAwesome6 name="location-dot" size={24} color={COLOR.mainColor} />
      <View style={{ flex: 1, marginHorizontal: scaleWidth(15) }}>
        <View style={styles.namngang}>
          <Text style={{ fontFamily: "semiBold", fontSize: 13 }}>
            {user.username}
          </Text>
          <Text style={[styles.phone, { marginLeft: 5 }]}>({user.phone})</Text>
        </View>
        <Text style={[styles.phone, { color: "#4F4F4F" }]}>{user.address}</Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <MaterialIcons name="navigate-next" size={24} color={COLOR.mainColor} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleWidth(15),
    borderRadius: scaleWidth(20),
    backgroundColor: "white",
    marginTop: scaleHeight(15),
    marginHorizontal: scaleWidth(15),
  },
  namngang: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  phone: {
    fontFamily: "regular",
    fontSize: 13,
    color: "#ccc",
  },
});
