import React, { useState } from 'react'
import { 
  View, 
  Text, 
  Modal, 
  TextInput 
} from 'react-native'
import styles from './SettingStyle'
import { useSelector } from 'react-redux'

import { COLOR } from '../../../assets/constant/color'
import Information_TextInput from '../../../components/Information_TextInput'
import CustomButton from '../../../components/customButton'
import { scaleWidth, scaleHeight } from '../../../assets/constant/responsive'

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

const UpdateInformation = ({isModalVisible = flase, closeModal}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSDT] = useState("");
  
  const error = useSelector((state) => state.auth.error);

  return (
    <Modal animationType='fade'
        transparent visible={isModalVisible}
        presentationStyle="overFullScreen" 
        onDismiss={() => closeModal}>
        <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                    <Text style={styles.text}>Cập nhật thông tin cá nhân</Text>
                    <AntDesign name="close" size={24} color={COLOR.mainColor} onPress={closeModal}/>
                </View>
                <Information_TextInput 
                  IconComponent={Feather}
                  iconName="user"
                  iconSize={scaleWidth(28)}
                  width={"95%"}
                  error={error} 
                  borderColor={error ? "red" : "#ccc"}
                  placeholder="Username"
                  onChangeText={(text) => setUsername(text)}
                />

                <Information_TextInput 
                  IconComponent={MaterialCommunityIcons}
                  iconName="phone"
                  iconSize={scaleWidth(28)}
                  width={"95%"}
                  error={error} 
                  borderColor={error ? "red" : "#ccc"}
                  placeholder="Số điện thoại"
                  onChangeText={(text) => setSDT(text)}
                />

                <Information_TextInput 
                  IconComponent={MaterialCommunityIcons}
                  iconName="email-outline"
                  iconSize={scaleWidth(28)}
                  width={"95%"}
                  error={error} 
                  borderColor={error ? "red" : "#ccc"}
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text)}
                />
                <CustomButton title="Cập nhật" width={"100%"} height={scaleHeight(50)} marginTop={scaleHeight(40)} backgroundColor={COLOR.mainColor} onPress={closeModal}/>
            </View>
        </View>
    </Modal>
  )
}

export default UpdateInformation