import React from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { scaleWidth } from "../assets/constant/responsive";
import { COLOR } from "../assets/constant/color";
import { deleteCheckedItemFunction } from "../redux/checkShopCart";
import { useDispatch, useSelector } from "react-redux";
const ModalConfirmDelete = ({ visible, onClose, delete: deleteProp }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const handleDelete = async () => {
    await deleteCheckedItemFunction(user.id, dispatch);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text
            style={[
              styles.modalText,
              { fontFamily: "regular", color: "#737373", fontSize: 13 },
            ]}
          >
            Bạn chắc chắn muốn xóa?
          </Text>
          <View style={styles.line} />
          <View style={styles.view}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.modalText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.yes}
              onPress={() => {
                handleDelete(); // Call the delete function
                onClose(); // Close the modal after confirming
              }}
            >
              <Text style={[styles.modalText, { color: COLOR.mainColor }]}>
                Xóa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: scaleWidth(20),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Optional: Set a width for the modal
  },
  modalText: {
    textAlign: "center",
    fontFamily: "medium",
  },
  line: {
    borderWidth: 1,
    borderColor: "#f4f1f1",
    width: "100%",
    marginTop: scaleWidth(20),
  },
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scaleWidth(20),
    borderRightColor: "#f4f1f1",
    borderRightWidth: 2,
  },
  yes: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scaleWidth(20),
  },
});

export default ModalConfirmDelete;
