import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../../assets/constant/color";
import mainStyles from "../../styles/mainStyles";
import { scaleWidth } from "../../assets/constant/responsive";
import { useNavigation } from "@react-navigation/native";

const TermAndCondition = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor="white"
        barStyle="dark-content"
      />
      <View style={mainStyles.headerContainer}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          name="chevron-back"
          size={scaleWidth(30)}
          color={COLOR.mainColor}
        />
        <Text style={mainStyles.headerText}>Điều Khoản và Điều Kiện</Text>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Điều Khoản và Điều Kiện Sử Dụng</Text>
        <Text style={styles.sectionTitle}>1. Giới thiệu</Text>
        <Text style={styles.text}>
          Ứng dụng PASSWME là nền tảng mua bán đồ cũ dành cho người Việt, kết
          nối người bán và người mua.
        </Text>

        <Text style={styles.sectionTitle}>2. Đăng ký và Tài khoản</Text>
        <Text style={styles.text}>
          Người dùng cần đăng ký tài khoản để sử dụng các chức năng của ứng
          dụng. Bạn cam kết cung cấp thông tin chính xác và đầy đủ.
        </Text>

        <Text style={styles.sectionTitle}>3. Cập nhật thông tin</Text>
        <Text style={styles.text}>
          Người dùng có trách nhiệm cập nhật thông tin cá nhân và giỏ hàng của
          mình để đảm bảo thông tin luôn chính xác.
        </Text>

        <Text style={styles.sectionTitle}>4. Mua bán sản phẩm</Text>
        <Text style={styles.text}>
          Người dùng có thể đăng bán và mua sản phẩm qua ứng dụng. Tất cả các
          giao dịch đều phải tuân thủ quy định của PASSWME.
        </Text>

        <Text style={styles.sectionTitle}>5. Thanh toán</Text>
        <Text style={styles.text}>
          PASSWME hỗ trợ nhiều phương thức thanh toán. Người dùng cần đảm bảo
          thanh toán đúng hạn để hoàn tất giao dịch.
        </Text>

        <Text style={styles.sectionTitle}>6. Bảo mật thông tin</Text>
        <Text style={styles.text}>
          Chúng tôi cam kết bảo vệ thông tin cá nhân của người dùng và không
          chia sẻ với bên thứ ba mà không có sự đồng ý.
        </Text>

        <Text style={styles.sectionTitle}>7. Quyền và nghĩa vụ</Text>
        <Text style={styles.text}>
          Người dùng có quyền khiếu nại và yêu cầu hỗ trợ từ đội ngũ hỗ trợ
          khách hàng của PASSWME.
        </Text>

        <Text style={styles.sectionTitle}>8. Thay đổi điều khoản</Text>
        <Text style={styles.text}>
          PASSWME có quyền thay đổi các điều khoản này mà không cần thông báo
          trước. Người dùng nên thường xuyên kiểm tra để cập nhật.
        </Text>

        <Text style={styles.sectionTitle}>9. Liên hệ</Text>
        <Text style={[styles.text, {marginBottom: 40}]}>
          Nếu có bất kỳ câu hỏi nào về các điều khoản này, xin vui lòng liên hệ
          với chúng tôi qua ứng dụng.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scaleWidth(15),
    backgroundColor: "#f4f4f4"
  },
  title: {
    fontSize: 24,
    fontFamily: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "bold",
    marginTop: 16,
  },
  text: {
    fontFamily: 'regular',
    fontSize: 16,
    marginVertical: 8,
  },
});

export default TermAndCondition;
