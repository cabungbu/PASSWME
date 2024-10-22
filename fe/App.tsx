import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { useCallback, } from "react";
import BottomTabBar from './components/BottomTabBar';
import AppLoading from 'expo-app-loading';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    light: require("./assets/fonts/Inter-Light.otf"),
    regular: require("./assets/fonts/Inter-Regular.otf"),
    medium: require("./assets/fonts/Inter-Medium.otf"),
    semiBold: require("./assets/fonts/Inter-SemiBold.otf"),
    bold: require("./assets/fonts/Inter-Bold.otf"),
    extraBold: require("./assets/fonts/Inter-ExtraBold.otf"),
    black: require("./assets/fonts/Inter-Black.otf"),
    
    italic: require("./assets/fonts/Inter-Italic.otf"),
    boldItalic: require("./assets/fonts/Inter-BoldItalic.otf"),
    lightItalic: require("./assets/fonts/Inter-LightItalic.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <BottomTabBar />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
