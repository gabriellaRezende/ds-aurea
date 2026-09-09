import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { configureAllThemes } from '@aurea/ds-core/mobile';
import { PlaygroundProvider } from '../context/PlaygroundContext';

// Registra todos os temas (Helios + Uranus, light + dark) no Unistyles.
// Deve ser chamado antes de qualquer componente que use useStyles.
configureAllThemes();

export default function RootLayout() {
  return (
    <PlaygroundProvider>
      <PaperProvider>
        <Tabs screenOptions={{ headerShown: false }}>
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
