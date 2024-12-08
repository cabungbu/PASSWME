import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { scaleHeight, scaleWidth } from '../assets/constant/responsive';

import FontAwesome from '@expo/vector-icons/FontAwesome';

const Information_TextInput = ({ 
  error, 
  placeholder, 
  onChangeText,
  iconName = '',
  iconSize = scaleWidth(24),
  width= "80%",
  IconComponent,
  Password = false
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const togglePasswordVisibility= () => {
    setSecureTextEntry(!secureTextEntry);
  }

  return (
    <View style={[styles.inputContainer, error && { borderColor: "red" }, {
      width
    }]}>
      {IconComponent && <IconComponent name={iconName} size={iconSize} color="#777777"/>} 
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#CCCCCC"
        onChangeText={onChangeText} 
        secureTextEntry={Password ? secureTextEntry : false}
      />
      {Password && 
        (secureTextEntry ? 
          (<FontAwesome name="eye-slash" size={scaleWidth(24)} color="#595959" onPress={togglePasswordVisibility} style={styles.HidePasswordIcon}/>) 
        : (<FontAwesome name="eye" size={scaleWidth(24)} color="#595959" onPress={togglePasswordVisibility} style={styles.HidePasswordIcon}/>)
        )
      }
    </View>
  );
}

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
    borderLeftColor: "#a0a0a0"
  }
});

export default Information_TextInput;