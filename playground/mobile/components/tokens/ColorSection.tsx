import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePlayground } from '../../context/PlaygroundContext';
import type { ThemeColors } from '@aurea/ds-core/shared';

const STRING_SLOTS: (keyof ThemeColors)[] = [
  'primary', 'accent',
  'success', 'info', 'warning', 'error',
  'background', 'surface', 'surfaceCard', 'backgroundSubtle',
  'textPrimary', 'textSecondary', 'textTertiary', 'textDisabled',
  'borderDefault', 'borderSubtle',
  'overlay', 'backgroundDisabled',
];

export function ColorSection() {
  const { theme } = usePlayground();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Cores</Text>
      <View style={styles.grid}>
        {STRING_SLOTS.map((slot) => {
          const value = theme.colors[slot] as string;
          return (
            <View key={slot} style={styles.item}>
              <View style={[styles.swatch, { backgroundColor: value, borderColor: theme.colors.borderSubtle }]} />
              <Text style={[styles.slotName, { color: theme.colors.textPrimary }]}>{slot}</Text>
              <Text style={[styles.slotValue, { color: theme.colors.textSecondary }]}>{value}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  item: { width: '44%', gap: 4 },
  swatch: { width: '100%', height: 48, borderRadius: 8, borderWidth: 1 },
  slotName: { fontSize: 12, fontWeight: '600' },
  slotValue: { fontSize: 11 },
});
