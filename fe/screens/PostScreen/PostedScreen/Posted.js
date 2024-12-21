import { View, Text, StatusBar, Image } from "react-native";
import React from "react";
import mainStyles from "../../../styles/mainStyles";

import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import styles from "./PostedStyle";
import CustomButton from "../../../components/customButton";
import { COLOR } from "../../../assets/constant/color";
import { useNavigation } from "@react-navigation/native";

const Posted = ({ route }) => {
  const navigation = useNavigation();
  const { image, title, price } = route.params;

  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setMonth(today.getMonth() + 1);

  const formattedToday = today.toLocaleDateString();
  const formattedExpirationDate = expirationDate.toLocaleDateString();

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={mainStyles.headerCenterContainer}>
        <Ionicons
          style={mainStyles.headerIcon}
          name="chevron-back"
          size={scaleWidth(30)}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={[mainStyles.headerCenterText, { marginRight: scaleWidth(30) }]}
        >
          Đăng tin thành công
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.noti}>
          <Entypo
            name="check"
            size={scaleWidth(25)}
            color="white"
            style={{
              backgroundColor: "#369C33",
              borderRadius: 100,
              padding: scaleWidth(5),
              marginRight: scaleWidth(20),
            }}
          />
          <Text style={styles.noti_text}>Bạn đã đăng tin thành công!</Text>
        </View>
        <View style={styles.post}>
          <Image
            source={{ uri: image }}
            style={{
              width: scaleHeight(90),
              height: scaleHeight(108),
              borderRadius: 10,
              resizeMode: "cover",
              marginRight: scaleWidth(15),
            }}
          />
          <View>
            <Text style={styles.boldText}>{title}</Text>
            <Text style={[styles.boldText, { color: COLOR.mainColor }]}>
              {formatPrice(price)} Đ
            </Text>
            <Text style={[styles.regularText, { color: "#a0a0a0" }]}>
              Ngày đăng:{" "}
              <Text style={styles.regularText}>{formattedToday}</Text>
            </Text>
            <Text style={[styles.regularText, { color: "#a0a0a0" }]}>
              Ngày hết hạn:{" "}
              <Text style={styles.regularText}>{formattedExpirationDate}</Text>
            </Text>
          </View>
        </View>
        <Text style={styles.boldText}>
          Tăng hiệu quả bán hàng với dịch vụ nâng cao
        </Text>
        <Text style={styles.regularText}>
          Tiếp cận thêm nhiều khách hàng và bán nhanh hơn
        </Text>
        <View style={styles.proposeNewArticle}>
          <View>
            <Text style={styles.boldText}>Đẩy tin mới gợi ý</Text>
            <Text style={[styles.boldText, { color: COLOR.successColor }]}>
              5.000đ
            </Text>
          </View>
          <CustomButton
            width={scaleWidth(75)}
            height={scaleHeight(40)}
            borderRadius={5}
            borderColor={COLOR.successColor}
            borderWidth={0.5}
            fontSize={15}
            color={COLOR.successColor}
            title="Chọn"
          />
        </View>
      </View>
      <View style={styles.move}>
        <CustomButton
          width={scaleWidth(170)}
          height={scaleHeight(50)}
          borderRadius={15}
          backgroundColor={COLOR.mainColor}
          borderWidth={1}
          fontSize={15}
          // color={COLOR.mainColor}
          title="Quản lý tin"
          onPress={() => navigation.navigate("MyStoreScreen", { 
            screen: "MyStoreScreen" 
          })}
        />
        <CustomButton
          width={scaleWidth(170)}
          height={scaleHeight(50)}
          borderRadius={15}
          backgroundColor={COLOR.mainColor}
          borderWidth={1}
          fontSize={15}
          // color={COLOR.mainColor}
          title="Về trang chủ"
          onPress={()=>navigation.navigate("HomeScreen")}
        />
      </View>
    </View>
  );
};

export default Posted;
