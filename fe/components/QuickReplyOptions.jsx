import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

const QuickReplyOptions = ({ options, onSelect }) => {
  return (
    <View style={styles.quickReplyContainer}>
        <Text style={styles.quickReplyText}>Câu hỏi nhanh</Text>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.quickReplyButton}
            onPress={() => onSelect(option)}
          >
            <Text style={styles.quickReplyText}>{option.question}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickReplyContainer: {
    backgroundColor: "black",
    paddingHorizontal: 15,
    borderRadius: 20,
    overflow: 'hidden',
    maxWidth: '80%'
  },
  quickReplyButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "white"
  },
  quickReplyText: {
    color: "white",
    fontFamily: "regular",
    fontSize: 14,
  },
});

export default QuickReplyOptions;
