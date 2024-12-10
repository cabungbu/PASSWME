import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../../../services/address";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import Picker from "../../../components/Picker";
import CustomButton from "../../../components/customButton";
import { COLOR } from "../../../assets/constant/color";

import Ionicons from "@expo/vector-icons/Ionicons";

const AddressPicker = ({ setFullAddress, onClose }) => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState(null);
  const [specificAddress, setSpecificAddress] = useState("");

  useEffect(() => {
    const fetchProvince = async () => {
      const response = await getProvinces();
      setProvinces(response?.results);
    };
    fetchProvince();
  }, []);

  useEffect(() => {
    const fetchDistrict = async () => {
      const response = await getDistricts(province?.province_id);
      setDistricts(response?.results);
    };
    province && fetchDistrict();
  }, [province]);

  useEffect(() => {
    const fetchWard = async () => {
      const response = await getWards(district?.district_id);
      setWards(response?.results);
    };
    province && district && fetchWard();
  }, [province, district]);

  const handleProvinceChange = (itemValue) => {
    const selected = provinces.find((p) => p.province_id === itemValue);
    setProvince(selected);
    setDistrict(null);
    setWard(null);
  };

  const handleDistrictChange = (itemValue) => {
    const selected = districts.find((p) => p.district_id === itemValue);
    setDistrict(selected);
    setWard(null);
  };

  const handleWardChange = (itemValue) => {
    const selected = wards.find((w) => w.ward_id === itemValue);
    setWard(selected);
  };

  const handleSaveAddress = () => {
    const addressParts = [
      province?.province_name,
      district?.district_name,
      ward?.ward_name,
    ]
      .filter(Boolean)
      .join(", ");

    const combinedAddress = specificAddress
      ? `${addressParts}, ${specificAddress}`
      : addressParts;

    setFullAddress(combinedAddress);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickersContainer}>
        <View style={styles.pickerContainer}>
          {/* <Text style={styles.label}>Chọn Tỉnh/Thành Phố:</Text> */}
          <Picker
            options={[
              { label: "Chọn tỉnh/thành phố", value: null },
              ...provinces.map((province) => ({
                label: province.province_name,
                value: province.province_id,
              })),
            ]}
            selectedValue={province?.province_id}
            onValueChange={handleProvinceChange}
            placeholder="Chọn tỉnh/thành phố"
          />
        </View>
        <View style={styles.pickerContainer}>
          {/* <Text style={styles.label}>Chọn Quận/Huyện:</Text> */}
          <Picker
            options={[
              { label: "Chọn quận/huyện", value: null },
              ...districts.map((district) => ({
                label: district.district_name,
                value: district.district_id,
              })),
            ]}
            selectedValue={district?.district_id}
            onValueChange={handleDistrictChange}
            placeholder="Chọn quận/huyện"
            disabled={!province}
          />
        </View>
        <View style={styles.pickerContainer}>
          {/* <Text style={styles.label}>Chọn Phường/Xã:</Text> */}
          <Picker
            options={[
              { label: "Chọn phường/xã", value: null },
              ...wards.map((ward) => ({
                label: ward.ward_name,
                value: ward.ward_id,
              })),
            ]}
            selectedValue={ward?.ward_id}
            onValueChange={handleWardChange}
            placeholder="Chọn phường/xã"
            disabled={!district}
          />
        </View>
      </View>
      <View style={styles.input}>
        <Ionicons
          name="location-outline"
          size={24}
          color="black"
          style={{ paddingBottom: 5 }}
        />
        <TextInput
          style={{
            fontFamily: "regular",
            borderBottomWidth: 1,
            borderColor: "#a0a0a0",
            marginTop: scaleHeight(10),
            flex: 1,
          }}
          placeholder="Địa chỉ cụ thể (Số nhà, Tên đường)"
          value={specificAddress}
          onChangeText={setSpecificAddress}
        />
      </View>
      <CustomButton
        onPress={handleSaveAddress}
        title="Lưu Địa Chỉ"
        fontSize={14}
        fontFamily="medium"
        width={scaleWidth(150)}
        height={scaleHeight(50)}
        marginTop={scaleHeight(10)}
        backgroundColor={COLOR.successColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  pickersContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  pickerContainer: {
    width: scaleWidth(130),
    height: "auto",
  },
  label: {
    fontSize: 12,
    fontFamily: "medium",
    color: "black",
  },
  input: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

export default AddressPicker;
