import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStyles } from 'react-native-unistyles';

export function TypographySection() {
  const { theme } = useStyles();
  const { roles } = theme.typography;

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Tipografia</Text>
      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.borderSubtle }]}>
        {(Object.entries(roles) as [string, typeof roles.body][]).map(([name, role], i, arr) => (
          <View key={name} style={[styles.row, i < arr.length - 1 && { borderBottomColor: theme.colors.borderSubtle, borderBottomWidth: 1 }]}>
            <View style={styles.meta}>
              <Text style={[styles.roleName, { color: theme.colors.textSecondary }]}>{name}</Text>
              <Text style={[styles.roleSpec, { color: theme.colors.textTertiary }]}>
                {role.fontSize}px · {role.fontWeight} · lh {role.lineHeight}
              </Text>
            </View>
            <Text
              style={{
                color: theme.colors.textPrimary,
                fontSize: role.fontSize,
                fontWeight: role.fontWeight,
                lineHeight: role.lineHeight,
                flex: 1,
              }}
              numberOfLines={1}
            >
              Aurea DS
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
  card: { borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 },
  meta: { width: 100 },
  roleName: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  roleSpec: { fontSize: 10, marginTop: 2 },
});
