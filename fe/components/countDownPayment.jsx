import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  SafeAreaViewComponent,
} from "react-native";

const CountdownTimer = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // Thời gian tính bằng giây

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <View style={styles.timeBlock}>
        <Text style={styles.timeText}>{hours.toString().padStart(2, "0")}</Text>
        <Text style={styles.labelText}>Giờ</Text>
      </View>

      <View style={styles.timeBlock}>
        <Text style={styles.timeText}>
          {minutes.toString().padStart(2, "0")}
        </Text>
        <Text style={styles.labelText}>Phút</Text>
      </View>

      <View style={styles.timeBlock}>
        <Text style={styles.timeText}>
          {seconds.toString().padStart(2, "0")}
        </Text>
        <Text style={styles.labelText}>Giây</Text>
      </View>
    </View>
  );
};

export default CountdownTimer;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9efd8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  timeBlock: {
    backgroundColor: "#fcdb9e",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  timeText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffab0e",
  },
  labelText: {
    fontSize: 12,
    fontFamily: "medium",
    color: "#ffab0e",
  },
});

// Sử dụng:
// <CountdownTimer initialTime={5400} /> // 1 giờ 30 phút = 5400 giây
