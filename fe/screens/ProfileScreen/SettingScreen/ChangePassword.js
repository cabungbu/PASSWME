import React, { useState } from 'react'
import { 
  View, 
  Text, 
  Modal, 
  TextInput 
} from 'react-native'
import { useSelector } from 'react-redux'

import styles from './SettingStyle'
import { COLOR } from '../../../assets/constant/color'
import Information_TextInput from '../../../components/Information_TextInput'
import CustomButton from '../../../components/customButton'
import { scaleWidth, scaleHeight } from '../../../assets/constant/responsive'

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from "@expo/vector-icons/Feather";

const ChangePassword = ({isModalVisible = flase, closeModal}) => {
  const [password, setPassword] = useState("")
  const error = useSelector((state) => state.auth.error);

  return (
    <Modal animationType='fade'
        transparent visible={isModalVisible}
        presentationStyle="overFullScreen" 
        onDismiss={() => closeModal}>
        <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                    <Text style={styles.text}>Cập nhật mật khẩu</Text>
                    <AntDesign name="close" size={24} color={COLOR.mainColor} onPress={closeModal}/>
                </View>
                <Information_TextInput 
                  IconComponent={Feather}
                  iconName="lock"
                  iconSize={scaleWidth(28)}
                  width="100%"
                  error={error} 
                  borderColor={error ? "red" : "#ccc"}
                  placeholder="Mật khẩu đang sử dụng"
                  Password={true}
                  onChangeText={(text) => setPassword(text)}
                />
                <Information_TextInput 
                  IconComponent={Feather}
                  iconName="lock"
                  iconSize={scaleWidth(28)}
                  width="100%"
                  error={error} 
                  borderColor={error ? "red" : "#ccc"}
                  placeholder="Mật khẩu mới"
                  Password={true}
                  onChangeText={(text) => setPassword(text)}
                />
                <Information_TextInput 
                  IconComponent={Feather}
                  iconName="lock"
                  iconSize={scaleWidth(28)}
                  width="100%"
                  error={error} 
                  borderColor={error ? "red" : "#ccc"}
                  placeholder="Xác nhận lại mật khẩu mới"
                  Password={true}
                  onChangeText={(text) => setPassword(text)}
                />
                <CustomButton title="Cập nhật" width={"100%"} height={scaleHeight(50)} marginTop={scaleHeight(50)} backgroundColor={COLOR.mainColor} onPress={closeModal}/>
            </View>
        </View>
    </Modal>
  )
}

export default ChangePassword