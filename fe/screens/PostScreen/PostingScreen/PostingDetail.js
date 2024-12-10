import { View, Text, StatusBar } from "react-native";
import React from "react";
import styles from "./PostingDetailStyle";
import { useNavigation } from "@react-navigation/native";
import Picker from "../../../components/Picker";

const PostingDetail = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  navigation = useNavigation()

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Đăng tin</Text>
      </View>
      <View>
      </View>
    </View>
  );
};

export default PostingDetail;
