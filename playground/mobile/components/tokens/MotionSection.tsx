import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePlayground } from '../../context/PlaygroundContext';

export function MotionSection() {
  const { theme } = usePlayground();
  const { duration, easing } = theme.motion;

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Motion</Text>

      <Text style={[styles.groupTitle, { color: theme.colors.textSecondary }]}>Duração</Text>
      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.borderSubtle }]}>
        {(Object.entries(duration) as [string, number][]).map(([name, ms]) => (
          <View key={name} style={[styles.row, { borderBottomColor: theme.colors.borderSubtle }]}>
            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>{name}</Text>
            <Text style={[styles.value, { color: theme.colors.textSecondary }]}>{ms}ms</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.groupTitle, { color: theme.colors.textSecondary, marginTop: 16 }]}>Easing (cubic-bezier)</Text>
      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.borderSubtle }]}>
        {(Object.entries(easing) as [string, readonly number[]][]).map(([name, curve]) => (
          <View key={name} style={[styles.row, { borderBottomColor: theme.colors.borderSubtle }]}>
            <Text style={[styles.label, { color: theme.colors.textPrimary }]}>{name}</Text>
            <Text style={[styles.value, { color: theme.colors.textSecondary }]}>
              {`(${curve.join(', ')})`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  groupTitle: { fontSize: 13, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: { borderRadius: 12, borderWidth: 1, overflow: 'hidden', marginBottom: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1 },
  label: { fontSize: 14, fontWeight: '500' },
  value: { fontSize: 13 },
});
