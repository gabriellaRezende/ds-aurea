import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStyles } from 'react-native-unistyles';

export function SpacingSection() {
  const { theme } = useStyles();
  const { spacing } = theme;

  const scales = Object.entries(spacing).filter(([, v]) => typeof v === 'number') as [string, number][];

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Spacing</Text>
      <View style={styles.rows}>
        {scales.map(([name, value]) => (
          <View key={name} style={styles.row}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{name}</Text>
            <View style={[styles.bar, { width: value * 3, backgroundColor: theme.colors.primary }]} />
            <Text style={[styles.value, { color: theme.colors.textTertiary }]}>{value}px</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  rows: { gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  label: { width: 32, fontSize: 12, fontWeight: '600' },
  bar: { height: 12, borderRadius: 4 },
  value: { fontSize: 12 },
});
