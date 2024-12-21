import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PostingRules = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Quy Định Đăng Tin Dành Cho Người Bán</Text>
      
      <Text style={styles.sectionTitle}>1. Đối Tượng Đăng Tin</Text>
      <Text style={styles.text}>
        Người bán phải là cá nhân hoặc tổ chức có nhu cầu bán hàng hóa cũ hoặc đã qua sử dụng. Tất cả người bán cần tuân thủ các quy định của pháp luật hiện hành.
      </Text>

      <Text style={styles.sectionTitle}>2. Các Loại Hàng Hóa Được Phép Đăng</Text>
      <Text style={styles.text}>
        Người bán có thể đăng tin cho các mặt hàng sau:
      </Text>
      <Text style={styles.text}>- Xe Cộ: Ô tô, xe máy, xe đạp.</Text>
      <Text style={styles.text}>- Thiết Bị Điện Tử: Điện thoại, laptop, tivi.</Text>
      <Text style={styles.text}>- Thú Cưng: Chó, mèo, động vật nuôi.</Text>
      <Text style={styles.text}>- Thực Phẩm & Đồ Uống: Thực phẩm khô, đồ uống.</Text>
      <Text style={styles.text}>- Đồ Gia Dụng: Dụng cụ nhà bếp, đồ dùng hàng ngày.</Text>
      <Text style={styles.text}>- Đồ Nội Thất: Bàn, ghế, tủ.</Text>
      <Text style={styles.text}>- Mẹ và Bé: Đồ dùng cho trẻ em.</Text>
      <Text style={styles.text}>- Thời Trang & Đồ Dùng Cá Nhân: Quần áo, giày dép.</Text>
      <Text style={styles.text}>- Giải Trí & Thể Thao: Thiết bị thể thao.</Text>
      <Text style={styles.text}>- Văn Phòng Phẩm: Sách, bút, giấy tờ.</Text>
      <Text style={styles.text}>- Công Nông Nghiệp: Thiết bị nông nghiệp.</Text>

      <Text style={styles.sectionTitle}>3. Nội Dung Đăng Tin</Text>
      <Text style={styles.text}>
        Mỗi tin đăng cần có tiêu đề rõ ràng và mô tả chi tiết về sản phẩm.
      </Text>
      <Text style={styles.text}>
        Cung cấp thông tin chính xác về tình trạng hàng hóa và không đăng tin chứa nội dung vi phạm.
      </Text>

      <Text style={styles.sectionTitle}>4. Giá Cả</Text>
      <Text style={styles.text}>
        Cung cấp giá rõ ràng, chính xác cho từng sản phẩm. Giá nên hợp lý và có thể thương lượng.
      </Text>

      <Text style={styles.sectionTitle}>5. Chính Sách Giao Dịch</Text>
      <Text style={styles.text}>
        Người bán cần thỏa thuận với người mua về phương thức giao dịch và đảm bảo thông tin liên lạc chính xác.
      </Text>

      <Text style={styles.sectionTitle}>6. Trách Nhiệm của Người Bán</Text>
      <Text style={styles.text}>
        Chịu trách nhiệm về tính hợp pháp và chất lượng của sản phẩm được bán.
      </Text>

      <Text style={styles.sectionTitle}>7. Xử Lý Vi Phạm</Text>
      <Text style={styles.text}>
        Tin đăng vi phạm sẽ bị xóa mà không cần thông báo. Người bán tái phạm có thể bị khóa tài khoản.
      </Text>

      <Text style={styles.sectionTitle}>8. Bảo Mật Thông Tin</Text>
      <Text style={[styles.text, {marginBottom: 40}]}>
        Không tiết lộ thông tin cá nhân của người dùng khác mà không có sự đồng ý.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default PostingRules;