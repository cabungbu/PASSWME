// ActiveListings.js
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList
} from 'react-native';
import axios from 'axios';
import ActiveListingCard from '../../components/ActiveListingCard';

export default function ActiveListings() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://192.168.1.6:3000/post/getAllPost");
        const postsData = res.data;
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <ActiveListingCard post={item} />}
        keyExtractor={item => item.id?.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.flatListContent}
        onEndReachedThreshold={0.5}
        bounces={true}
        // Thêm khoảng cách giữa các items
        ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  flatListContent: {
    paddingBottom: 90
  },
});