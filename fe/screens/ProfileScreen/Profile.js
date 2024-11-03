import { useDispatch } from "react-redux";
import {
  Alert,
  Animated,
  TouchableOpacity,
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { logoutUser as logoutUserService } from "../../redux/authService"; // Đổi tên khi import
import { useSelector } from "react-redux";

export default function Profile() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Đổi tên function
  const handleLogout = () => {
    const id = { id: user.id };
    navigation.navigate("Welcome");
    logoutUserService(id, dispatch, navigation);
  };

  return (
    <SafeAreaView>
      <Text>Chào! hehe nè</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
