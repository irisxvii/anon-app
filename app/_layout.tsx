import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
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
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <ThemeProvider value={DarkTheme}>
        <Stack 
          screenOptions={{ 
            headerShown: false,
            animation: 'none',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            fullScreenGestureEnabled: true,
          }}
        >
          <Stack.Screen 
            name="roleSelection" 
            options={{ 
              animation: 'none',
            }} 
          />
          <Stack.Screen 
            name="(tabs)" 
            options={{
              animation: 'none',
            }}
          />
          <Stack.Screen 
            name="screens/report" 
            options={{
              animation: 'none',
              presentation: 'modal',
            }}
          />
          <Stack.Screen 
            name="screens/detail" 
            options={{
              animation: 'none',
            }}
          />
          <Stack.Screen 
            name="screens/thankyou" 
            options={{
              animation: 'none',
            }}
          />
          <Stack.Screen 
            name="adminLogin" 
            options={{
              animation: 'none',
            }}
          />
          <Stack.Screen 
            name="adminDashboard" 
            options={{
              animation: 'none',
            }}
          />
          <Stack.Screen 
            name="+not-found" 
            options={{
              animation: 'none',
            }}
          />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </View>
  );
}
