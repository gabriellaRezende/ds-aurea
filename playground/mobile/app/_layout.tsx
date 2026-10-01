import { Tabs } from 'expo-router';
import { PlaygroundProvider } from '../context/PlaygroundContext';

export default function RootLayout() {
  return (
    <PlaygroundProvider>
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
        <Tabs.Screen
          name="novo-produto"
          options={{ tabBarLabel: 'Novo Produto' }}
        />
      </Tabs>
    </PlaygroundProvider>
  );
}
