import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({
  width = '100%', // Mặc định chiều rộng 100%
  height = 50,    // Mặc định chiều cao 50
  borderRadius = 5, // Mặc định bo góc 5
  backgroundColor = '#007BFF', // Mặc định màu nền
  borderColor = 'transparent', // Mặc định không có viền
  borderWidth = 0, // Mặc định không có viền
  title = 'Button', // Mặc định chữ là 'Button'
  onPress, // Hàm xử lý khi nhấn
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
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
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, // Viền mặc định
  },
  buttonText: {
    color: '#FFFFFF', // Màu chữ trắng
    fontSize: 16,
    fontFamily: "semiBold"
  },
});

export default CustomButton;