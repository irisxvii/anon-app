import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
    <ThemeProvider value={DarkTheme}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 300,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          fullScreenGestureEnabled: true,
        }}
      >
        <Stack.Screen 
          name="roleSelection" 
          options={{ 
            animation: 'fade',
            animationDuration: 400,
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{
            animation: 'slide_from_right',
            animationDuration: 300,
          }}
        />
        <Stack.Screen 
          name="screens/report" 
          options={{
            animation: 'slide_from_right',
            animationDuration: 300,
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="screens/detail" 
          options={{
            animation: 'slide_from_right',
            animationDuration: 300,
          }}
        />
        <Stack.Screen 
          name="screens/thankyou" 
          options={{
            animation: 'fade',
            animationDuration: 400,
          }}
        />
        <Stack.Screen 
          name="adminLogin" 
          options={{
            animation: 'slide_from_right',
            animationDuration: 300,
          }}
        />
        <Stack.Screen 
          name="adminDashboard" 
          options={{
            animation: 'slide_from_right',
            animationDuration: 300,
          }}
        />
        <Stack.Screen 
          name="+not-found" 
          options={{
            animation: 'fade',
            animationDuration: 300,
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
