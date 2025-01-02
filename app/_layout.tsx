import { Stack } from 'expo-router/stack';
import { SessionProvider } from '@/contexts/AuthContext';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
  },
};

const Layout = () => {
  return (
    <PaperProvider theme={theme}>
      <SessionProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SessionProvider>
    </PaperProvider>
  );
}

export default Layout