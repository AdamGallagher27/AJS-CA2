import { Stack } from 'expo-router/stack';
import { SessionProvider } from '@/contexts/AuthContext';

const Layout = () => {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}

export default Layout