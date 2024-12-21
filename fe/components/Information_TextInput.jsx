import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { scaleHeight, scaleWidth } from "../assets/constant/responsive";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLOR } from "../assets/constant/color";

const Information_TextInput = ({
  error,
  placeholder,
  onChangeText,
  iconName = "",
  iconSize = scaleWidth(24),
  width = "80%",
  IconComponent,
  Password = false,
  Address = false,
  updateAddress: controlledUpdateAddress,
  onUpdateAddressChange,
  value,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [localUpdateAddress, setLocalUpdateAddress] = useState(false);

  const togglePasswordVisibility = () => {
    setSecureTextEntry((prevState) => !prevState);
  };

  const updateAddress =
    controlledUpdateAddress !== undefined
      ? controlledUpdateAddress
      : localUpdateAddress;

  const toggleUpdateState = () => {
    const newUpdateState = !updateAddress;
    if (onUpdateAddressChange) {
      onUpdateAddressChange(newUpdateState);
    } else {
      setLocalUpdateAddress(newUpdateState);
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        error && { borderColor: "red" },
        { width },
      ]}
    >
      {IconComponent && (
        <IconComponent name={iconName} size={iconSize} color="#777777" />
      )}
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        multiline={Password ? false : true}
        placeholderTextColor="#CCCCCC"
        onChangeText={Address ? false : onChangeText}
        secureTextEntry={secureTextEntry}
        value={value}
      />
      {Password && (
        <FontAwesome
          name={secureTextEntry ? "eye-slash" : "eye"}
          size={scaleWidth(24)}
          color="#595959"
          onPress={togglePasswordVisibility}
          style={styles.HidePasswordIcon}
        />
      )}
      {Address && (
        <MaterialIcons
          name="edit"
          size={scaleWidth(24)}
          color={updateAddress ? COLOR.mainColor : "#a0a0a0"}
          onPress={toggleUpdateState}
          style={styles.HidePasswordIcon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(5),
    borderWidth: 1,
    borderColor: "#a0a0a0",
    marginBottom: scaleHeight(20),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    marginLeft: scaleWidth(15),
    fontFamily: "regular",
    flex: 1,
  },
  HidePasswordIcon: {
    paddingLeft: scaleWidth(15),
    paddingVertical: scaleHeight(5),
    borderLeftWidth: 1,
    borderLeftColor: "#a0a0a0",
  },
});

export default Information_TextInput;
