import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlayground } from '../context/PlaygroundContext';

export function PlaygroundHeader() {
  const { product, mode, theme, setProduct, setMode } = usePlayground();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.borderSubtle }]}>
      <View style={styles.group}>
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Produto</Text>
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.option, product === 'helios' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setProduct('helios')}
          >
            <Text style={[styles.optionText, { color: product === 'helios' ? '#fff' : theme.colors.textPrimary }]}>
              Helios
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, product === 'uranus' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setProduct('uranus')}
          >
            <Text style={[styles.optionText, { color: product === 'uranus' ? '#fff' : theme.colors.textPrimary }]}>
              Uranus
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.group}>
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Modo</Text>
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.option, mode === 'light' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setMode('light')}
          >
            <Text style={[styles.optionText, { color: mode === 'light' ? '#fff' : theme.colors.textPrimary }]}>
              Light
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, mode === 'dark' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setMode('dark')}
          >
            <Text style={[styles.optionText, { color: mode === 'dark' ? '#fff' : theme.colors.textPrimary }]}>
              Dark
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  group: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  toggle: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
