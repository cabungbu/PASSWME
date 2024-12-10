import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ScrollViewBase,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { COLOR } from "../../../assets/constant/color";
import Information_TextInput from "../../../components/Information_TextInput";
import CustomButton from "../../../components/customButton";
import { scaleWidth, scaleHeight } from "../../../assets/constant/responsive";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import mainStyles from "../../../styles/mainStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AddressPicker from "./AddressPicker";
import { updateUserInformation } from "../../../redux/authService";

const UpdateInformation = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSDT] = useState("");
  const [updateAddress, setUpdateAddress] = useState(false);
  const [fullAddress, setFullAddress] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  const refreshTokenRedux = useSelector((state) => state.auth.refreshToken);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleUpdateInformation = () => {
    const newUser = {
      email: email ? email : user?.email,
      phone: sdt ? sdt : user?.sdt,
      username: username ? username : user?.username,
      address: fullAddress ? fullAddress : user?.address,
    };

    updateUserInformation(newUser, dispatch, user, refreshTokenRedux, accessToken);
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
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
        <Text style={mainStyles.headerText}>Cài đặt tài khoản</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Information_TextInput
          IconComponent={Feather}
          iconName="user"
          iconSize={scaleWidth(28)}
          width={"90%"}
          error={error}
          borderColor={error ? "red" : "#ccc"}
          placeholder={user ? `${user.username}` : "Username"}
          onChangeText={(text) => setUsername(text)}
        />

        <Information_TextInput
          IconComponent={MaterialCommunityIcons}
          iconName="phone"
          iconSize={scaleWidth(28)}
          width={"90%"}
          error={error}
          borderColor={error ? "red" : "#ccc"}
          placeholder={user ? `${user.phone}` : "Số điện thoại"}
          onChangeText={(text) => setSDT(text)}
        />

        <Information_TextInput
          IconComponent={MaterialCommunityIcons}
          iconName="email-outline"
          iconSize={scaleWidth(28)}
          width={"90%"}
          error={error}
          borderColor={error ? "red" : "#ccc"}
          placeholder={user ? `${user.email}` : "Email"}
          onChangeText={(text) => setEmail(text)}
        />

        <Information_TextInput
          IconComponent={Ionicons}
          iconName="location-outline"
          iconSize={scaleWidth(28)}
          width={"90%"}
          borderColor={error ? "red" : "#ccc"}
          placeholder={user ? `${user.address}` : "Địa chỉ"}
          Address={true}
          updateAddress={updateAddress}
          onUpdateAddressChange={(newUpdateState) =>
            setUpdateAddress(newUpdateState)
          }
          value={fullAddress}
        />

        {updateAddress && (
          <View style={{}}>
            <AddressPicker
              setFullAddress={setFullAddress}
              onClose={() => setUpdateAddress(false)}
            />
          </View>
        )}
        <CustomButton
          onPress={handleUpdateInformation}
          title="Cập nhật"
          width={"90%"}
          height={scaleHeight(50)}
          marginTop={scaleHeight(40)}
          backgroundColor={COLOR.mainColor}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: scaleWidth(15),
    alignItems: "center",
    marginTop: scaleHeight(30),
  },
});

export default UpdateInformation;
