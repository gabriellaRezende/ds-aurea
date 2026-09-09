import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStyles } from 'react-native-unistyles';

export function ElevationSection() {
  const { theme } = useStyles();
  const entries = Object.entries(theme.elevation) as [string, typeof theme.elevation.xs][];

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Elevação</Text>
      <View style={styles.rows}>
        {entries.map(([name, ev]) => (
          <View
            key={name}
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: ev.shadowOffsetY },
                shadowOpacity: ev.shadowOpacity,
                shadowRadius: ev.shadowBlur,
                elevation: ev.androidElevation,
              },
            ]}
          >
            <Text style={[styles.cardName, { color: theme.colors.textPrimary }]}>{name}</Text>
            <Text style={[styles.cardSpec, { color: theme.colors.textTertiary }]}>
              y:{ev.shadowOffsetY} blur:{ev.shadowBlur} opacity:{ev.shadowOpacity}
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
  rows: { gap: 12 },
  card: { borderRadius: 12, padding: 16 },
  cardName: { fontSize: 14, fontWeight: '600' },
  cardSpec: { fontSize: 12, marginTop: 4 },
});
