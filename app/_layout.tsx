import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/";
import { useColorScheme } from "@/hooks/useColorScheme";
import { setupUrlCleaner } from "@/lib/cleanupExpoRouter";
import { Platform } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  if (Platform.OS === "web") {
    setupUrlCleaner();
  }

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Brands" options={{ headerShown: false }} />
          <Stack.Screen name="Models" options={{ headerShown: false }} />
          <Stack.Screen name="Generations" options={{ headerShown: false }} />
          <Stack.Screen name="FuelType" options={{ headerShown: false }} />
          <Stack.Screen name="Products" options={{ headerShown: false }} />
          <Stack.Screen name="SubProduct" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
