import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlayground } from '../../context/PlaygroundContext';
import { PlaygroundHeader } from '../../components/PlaygroundHeader';

export default function ComponentsScreen() {
  const { theme } = usePlayground();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <PlaygroundHeader />
      <View style={styles.empty}>
        <Text style={[styles.emptyTitle, { color: theme.colors.textPrimary }]}>
          Nenhum componente ainda
        </Text>
        <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
          Os componentes serão adicionados na Fase 3.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
