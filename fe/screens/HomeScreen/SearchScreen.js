import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from './SearchScreenStyle';
import { useSelector } from "react-redux";
import { BE_ENDPOINT } from '../../settings/localVars';
import PostCard from '../../components/postCard';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions } from 'react-native';
import RelativePost from '../postsDisplay/relativePost/RelativePost';
import RenderTabBar from '../../components/RenderTabBar';
import LastestPost from '../postsDisplay/relativePost/LastestPost';
import IncreasePost from '../postsDisplay/relativePost/IncreasePost';
import DecreasePost from '../postsDisplay/relativePost/DecreasePost';

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const user = useSelector((state) => state.auth?.user);
  const layout = useWindowDimensions();

  // Tab view state
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'relative', title: 'Liên quan' },
    { key: 'lastest', title: 'Mới nhất' },
    { key: 'increase', title: 'Giá tăng dần' },
    { key: 'decrease', title: 'Giá giảm dần' },
  ]);

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const fetchSearchHistory = async () => {
    try {
      const response = await fetch(`${BE_ENDPOINT}/user/${user.id}/searchHistory`);
      const data = await response.json();
      setSearchHistory(data.searchHistory);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  const addToSearchHistory = async (term) => {
    try {
      await fetch(`${BE_ENDPOINT}/user/${user.id}/addSearchHistory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm: term }),
      });
      fetchSearchHistory();
    } catch (error) {
      console.error('Error adding search term:', error);
    }
  };

  const searchPosts = async (term) => {
    setLoading(true);
    try {
      const response = await fetch(`${BE_ENDPOINT}/post/search?query=${term}`);
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    addToSearchHistory(term);
    searchPosts(term);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    if (text.length > 0) {
      // Implement real-time suggestions here if needed
      setSuggestions([]);
    } else {
      setSuggestions([]);
      setShowResults(false);
    }
  };

  const RelativeScene = useCallback(() => {
    return <RelativePost posts={searchResults.posts} />;
  }, [searchResults.posts]);

  
  const LastestScene = useCallback(() => {
    return <LastestPost posts={searchResults.posts} />;
  }, [searchResults.posts]);

  const IncreaseScene = useCallback(() => {
    return <IncreasePost posts={searchResults.posts} />;
  }, [searchResults.posts]);

  const DecreaseScene = useCallback(() => {
    return <DecreasePost posts={searchResults.posts} />;
  }, [searchResults.posts]);

  const renderScene = SceneMap({
    relative: RelativeScene,
    lastest: LastestScene,
    increase: IncreaseScene,
    decrease: DecreaseScene,
  });

  
  const renderTabBar = RenderTabBar({
    scroll: false,
    fontSize: 12,
    padding: 5,
    autoWidth: true,
  });

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => {
        setSearchText(item);
        handleSearch(item);
      }}
    >
      <AntDesign name="clockcircleo" size={20} color="#666" style={styles.searchIcon} />
      <Text style={styles.searchText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchInputContainer}>
          <AntDesign name="search1" size={20} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            value={searchText}
            onChangeText={handleSearchChange}
            onSubmitEditing={() => handleSearch(searchText)}
            autoFocus
          />
        </View>
        <TouchableOpacity onPress={() => {
          setSearchText('');
          setShowResults(false);
        }}>
          <Text style={styles.cancelText}>Huỷ</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#ee4d2d" />
      ) : showResults ? (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      ) : (
        <FlatList
          data={searchHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}