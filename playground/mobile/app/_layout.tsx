import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { PlaygroundProvider } from '../context/PlaygroundContext';

export default function RootLayout() {
  return (
    <PlaygroundProvider>
      <PaperProvider>
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="index" options={{ href: null }} />
          <Tabs.Screen
            name="tokens"
            options={{ tabBarLabel: 'Tokens' }}
          />
          <Tabs.Screen
            name="components"
            options={{ tabBarLabel: 'Componentes' }}
          />
        </Tabs>
      </PaperProvider>
    </PlaygroundProvider>
  );
}
