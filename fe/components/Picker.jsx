import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { scaleHeight, scaleWidth } from "../assets/constant/responsive";

import { COLOR } from "../assets/constant/color";
import styles from "../screens/ProfileScreen/SettingScreen/SettingStyle";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const Picker = ({ options, selectedValue, onValueChange, placeholder }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (item) => {
    onValueChange(item.value);
    setModalVisible(false);
    setSearchText("");
  };

  return (
    <View style={pickerStyles.container}>
      <TouchableOpacity
        style={pickerStyles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text style={pickerStyles.text}>
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
        </Text>
        <Entypo name="chevron-down" size={14} color="black" />
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.viewWrapper}>
          <View style={pickerStyles.modalContent}>
            <View style={styles.modalHeader}>
              <TextInput
                style={pickerStyles.text}
                placeholder="Tìm kiếm..."
                value={searchText}
                onChangeText={setSearchText}
              />
              <AntDesign
                name="close"
                size={24}
                color={COLOR.mainColor}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={pickerStyles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={pickerStyles.text}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const pickerStyles = StyleSheet.create({
  input: {
    width: "100%",
    padding: scaleWidth(5),
    minHeight: scaleHeight(70),
    borderWidth: 1,
    borderColor: "#a0a0a0",
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    color: "black",
    fontFamily: "regular",
    flex: 1
  },
  modalContent: {
    width: "80%",
    height: "50%",
    minHeight: scaleHeight(450),
    backgroundColor: "white",
    borderRadius: 10,
    padding: scaleWidth(15),
  },
  option: {
    padding: scaleWidth(15),
  },
});

export default Picker;
