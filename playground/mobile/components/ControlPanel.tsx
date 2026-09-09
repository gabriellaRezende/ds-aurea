import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useStyles } from 'react-native-unistyles';

type Control = {
  key: string;
  label: string;
  options: string[];
};

type ControlPanelProps = {
  controls: Control[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
};

// Painel de controles reutilizável para telas de componente.
// Usado nas entradas da Fase 3: cada componente declara seus controles
// (variant, size, state, etc.) e o painel renderiza os seletores.
//
// Exemplo de uso:
//
//   const [config, setConfig] = useState({ variant: 'primary', size: 'md', state: 'default' });
//
//   <ControlPanel
//     controls={[
//       { key: 'variant', label: 'Variante', options: ['primary', 'secondary', 'ghost'] },
//       { key: 'size',    label: 'Tamanho', options: ['sm', 'md', 'lg'] },
//       { key: 'state',   label: 'Estado',  options: ['default', 'disabled', 'loading', 'error', 'success'] },
//     ]}
//     values={config}
//     onChange={(key, value) => setConfig((prev) => ({ ...prev, [key]: value }))}
//   />

export function ControlPanel({ controls, values, onChange }: ControlPanelProps) {
  const { theme } = useStyles();

  return (
    <View style={[styles.panel, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.borderSubtle }]}>
      {controls.map((control) => (
        <View key={control.key} style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{control.label}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.options}>
            {control.options.map((option) => {
              const isActive = values[control.key] === option;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => onChange(control.key, option)}
                  style={[
                    styles.option,
                    {
                      backgroundColor: isActive ? theme.colors.primary : theme.colors.backgroundSubtle,
                      borderColor: isActive ? theme.colors.primary : theme.colors.borderDefault,
                    },
                  ]}
                >
                  <Text style={[styles.optionText, { color: isActive ? '#fff' : theme.colors.textPrimary }]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderTopWidth: 1,
    paddingVertical: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    width: 68,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  options: {
    flexDirection: 'row',
    gap: 6,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
