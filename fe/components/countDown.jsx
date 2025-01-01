import React, { useMemo, useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { scaleWidth, scaleHeight } from "../assets/constant/responsive";
const CountdownDisplay = React.memo(({ targetDate }) => {
  const [countdown, setCountdown] = useState("");
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const secondsLeft = (targetDate.getTime() - currentDate) / 1000;

      if (secondsLeft <= 0) {
        clearInterval(interval);
        setCountdown("00:00:00:00");
      } else {
        const days = formatTime(Math.floor(secondsLeft / 86400));
        const hours = formatTime(Math.floor((secondsLeft % 86400) / 3600));
        const minutes = formatTime(Math.floor((secondsLeft % 3600) / 60));
        const seconds = formatTime(Math.floor(secondsLeft % 60));

        setCountdown(`${days}:${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <MaterialCommunityIcons
        name="clock-time-eight-outline"
        size={16}
        color="#737373"
        style={{ marginRight: 2 }}
      />
      <Text style={styles.start}>{countdown}</Text>
    </View>
  );
});

export default CountdownDisplay;

const styles = StyleSheet.create({
  container_card: {
    width: scaleWidth(180),
    marginRight: scaleWidth(5),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 5,
    marginBottom: 5,
  },
  image: {
    width: scaleWidth(180),
    height: scaleWidth(150),
    resizeMode: "cover",
  },
  title: {
    fontSize: scaleWidth(12),
    marginVertical: 5,
    fontFamily: "regular",
    height: scaleHeight(40),
  },
  start: {
    fontSize: scaleWidth(11),
    marginVertical: 5,
    color: "#737373",
    fontFamily: "regular",
  },
});
