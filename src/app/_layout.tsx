import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SplashScreenController } from '../components/splash';
import { AuthProvider, useAuth } from '../context/AuthContext';

export const unstable_settings = {
  anchor: '(app)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
  const { user } = useAuth();
  return (
    <Stack>
      <Stack.Protected guard={!!user}>
        <Stack.Screen options={{ headerShown: false }} name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
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
