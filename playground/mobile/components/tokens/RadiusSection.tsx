import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePlayground } from '../../context/PlaygroundContext';

export function RadiusSection() {
  const { theme } = usePlayground();
  const entries = Object.entries(theme.borderRadius) as [string, number][];

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Border Radius</Text>
      <View style={styles.grid}>
        {entries.map(([name, value]) => (
          <View key={name} style={styles.item}>
            <View
              style={[
                styles.box,
                {
                  borderRadius: Math.min(value, 32),
                  backgroundColor: theme.colors.primary + '22',
                  borderColor: theme.colors.primary,
                },
              ]}
            />
            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>{name}</Text>
            <Text style={[styles.value, { color: theme.colors.textSecondary }]}>{value === 9999 ? '∞' : `${value}px`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  item: { alignItems: 'center', gap: 6, width: 72 },
  box: { width: 56, height: 56, borderWidth: 2 },
  label: { fontSize: 12, fontWeight: '600' },
  value: { fontSize: 11 },
});
