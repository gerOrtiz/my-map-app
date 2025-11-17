import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import * as Splash from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SplashScreenController } from '../components/splash';
import { AuthProvider, useAuth } from '../context/AuthContext';

export const unstable_settings = {
  anchor: '(app)',
};

SplashScreen.preventAutoHideAsync();
Splash.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Sweet-Affogato': require('@/src/assets/fonts/Sweet-Affogato.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) Splash.hideAsync();
  }, [fontsLoaded]);


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { authUser } = useAuth();
  return (
    <Stack>
      <Stack.Protected guard={!!authUser}>
        <Stack.Screen options={{ headerShown: false }} name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!authUser}>
        <Stack.Screen options={{ headerShown: false }} name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

// export default function RootLayout() {
//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <AuthProvider>
//         <Stack>
//           <Stack.Screen name="(app)" options={{ headerShown: false }} />
//           <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
//         </Stack>
//         <StatusBar style="auto" />
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }
