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

const IncreasePost = React.memo(
  ({ posts }) => {
    const createIncreasePosts = (posts) => {
      return posts.slice().sort((a, b) => {
        // Nếu không có products hoặc products rỗng, coi như giá là 0
        const minPriceA =
          a.products && a.products.length > 0
            ? Math.min(...a.products.map((product) => product.price))
            : 0;

        const minPriceB =
          b.products && b.products.length > 0
            ? Math.min(...b.products.map((product) => product.price))
            : 0;

        // Sắp xếp tăng dần
        return minPriceA - minPriceB;
      });
    };

    return (
      <View style={{ flex: 1 }}>
        {posts.length > 0 ? (
          <FlatList
            key="relative_post"
            data={createIncreasePosts(posts)}
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

export default IncreasePost;
