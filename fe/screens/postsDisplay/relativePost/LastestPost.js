import {
  View,
  Text,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import styles from "./styles";
import PostCard from "../../../components/postCard";
import RelativePost from "./RelativePost";

const LastestPost = React.memo(
  ({ posts }) => {
    console.log("render 1");

    const createLastestPosts = (posts) => {
      return posts
        .slice() // Tạo một bản sao của mảng để không làm thay đổi mảng gốc
        .sort((a, b) => {
          const dateA = new Date(a.start);
          const dateB = new Date(b.start);
          return dateB - dateA; // Sắp xếp theo thứ tự giảm dần
        });
    };

    return (
      <View style={{ flex: 1 }}>
        {posts.length > 0 ? (
          <FlatList
            key="relative_post"
            data={createLastestPosts(posts)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            style={styles.Wrapper}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.container,
                  posts.length % 2 !== 0 && index === posts.length - 1
                    ? styles.containerLast
                    : null,
                ]}
              >
                <PostCard post={item} />
              </View>
            )}
          ></FlatList>
        ) : (
          <>
            <Text style={styles.text}>Chưa có bài đăng nào được tạo</Text>
          </>
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function to prevent unnecessary re-renders
    return prevProps.posts === nextProps.posts;
  }
);

export default LastestPost;
