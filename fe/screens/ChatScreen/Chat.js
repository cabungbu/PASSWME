import { View, Text, StatusBar, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import mainStyles from "../../styles/mainStyles";
import ChatCard from "../../components/ChatCard";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import { BE_ENDPOINT } from "../../settings/localVars";
import { scaleHeight } from "../../assets/constant/responsive";
import { useFocusEffect } from "@react-navigation/native";

const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllChatRooms = async () => {
      try {
        setLoading(true);
        const res = await axios.get(BE_ENDPOINT + "/chatRoom/" + user?.id);
        const chatRoomsData = res.data || [];
        setChatRooms(chatRoomsData);
      } catch (error) {
        console.error(
          "Error fetching chat rooms:",
          error.response?.data?.message
        );
        Alert.alert("Lỗi", "Không thể tải các chat rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchAllChatRooms();
  }, [user?.id]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#369C33"
        style={{ margin: scaleHeight(20) }}
      />
    );
  }
  if (chatRooms.length === 0) {
    return <Text>Không có bài đăng</Text>;
  }

  const updateChatRoomUnreadCount = (chatRoomId, newUnreadCount) => {
    setChatRooms((prevChatRooms) =>
      prevChatRooms.map((chatRoom) =>
        chatRoom.id === chatRoomId
          ? {
              ...chatRoom,
              unreadCount: {
                ...chatRoom.unreadCount,
                [user.id]: newUnreadCount,
              },
            }
          : chatRoom
      )
    );
  };

  const updateLastMessage = (chatRoomId, newMessage) => {
    setChatRooms((prevChatRooms) =>
      prevChatRooms.map((chatRoom) =>
        chatRoom.id === chatRoomId
          ? {
              ...chatRoom,
              lastMessage: {
                content: newMessage.content,
                senderId: newMessage.senderId,
                type: newMessage.type,
                sendTime: {
                  seconds: Math.floor(new Date(newMessage.sendTime).getTime() / 1000),
                  nanoseconds: 0
                }
              }
            }
          : chatRoom
      )
    );
  };

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={mainStyles.headerCenterContainer}>
        <Text style={mainStyles.headerCenterText}>Chat</Text>
      </View>
      <View>
        <FlatList
          data={chatRooms}
          renderItem={({ item }) => (
            <ChatCard
              key={item.id?.toString()}
              chatRoom={item}
              userId={user?.id}
              updateUnreadCount={updateChatRoomUnreadCount}
              updateLastMessage={updateLastMessage}
            />
          )}
          keyExtractor={(item) => item.id?.toString()}
          showsVerticalScrollIndicator={true}
          // contentContainerStyle={styles.flatListContent}
          onEndReachedThreshold={0.5}
          bounces={true}
          ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
        />
      </View>
    </View>
  );
};

export default Chat;
