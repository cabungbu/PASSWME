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
import ActiveListingCard from '../../components/ActivePostCard';
import { BE_ENDPOINT } from '../../settings/localVars';
import { useSelector } from 'react-redux';

export default function ActiveListings() {
  const user = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllUserPosts = async () => {
      try {
        const res = await axios.get(BE_ENDPOINT + `/user/getUserById/${user.id}`);
        const postsData = res.data.posts;
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <ActiveListingCard 
            key={item.id?.toString()} 
            post={item} 
          />
        )}
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