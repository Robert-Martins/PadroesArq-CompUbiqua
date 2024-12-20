import AuthProvider from '@/core/contexts/auth.provider';
import LoadingProvider from '@/core/contexts/loading.provider';
import LocationProvider from '@/core/contexts/location.provider';
import ModalProvider from '@/core/contexts/modal.provider';
import { asDarkTheme, asLightTheme } from '@/core/design-system/theme';
import { agendeSaudeAppToastConfig } from '@/core/utils/toast.utils';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const RootLayoutNav: React.FC = () => {

  const colorScheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === "dark");

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkTheme(colorScheme === "dark");
    });
    return () => subscription.remove();
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? asDarkTheme : asLightTheme}>
      <ModalProvider>
        <LoadingProvider>
          <AuthProvider>
            <LocationProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style={isDarkTheme ? "light" : "dark"} translucent={true} />
                <Slot />
                <Toast {...agendeSaudeAppToastConfig} />
              </SafeAreaView>
            </LocationProvider>
          </AuthProvider>
        </LoadingProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}