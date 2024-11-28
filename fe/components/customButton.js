import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({
  width = '100%',
  height = 50,
  borderRadius = 5, 
  backgroundColor = '#007BFF',
  borderColor = 'transparent',
  borderWidth = 0, 
  title = 'Button',
  color = 'white',
  fontSize = 16,
  fontFamily = 'semiBold',
  onPress
}) => {
  return (
    <TouchableOpacity
      style={[styles.button,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, {color, fontFamily, fontSize}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: "semiBold"
  },
});

export default CustomButton;