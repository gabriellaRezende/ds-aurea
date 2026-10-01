import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  novoProdutoLight,
  novoProdutoDark,
  novoProdutoGradient,
  novoProdutoPrimaryHover,
} from '../novoProdutoTheme';

type Mode = 'light' | 'dark';

const REUSED_SLOTS: { key: keyof typeof novoProdutoLight; label: string }[] = [
  { key: 'success', label: 'success' },
  { key: 'info', label: 'info' },
  { key: 'warning', label: 'warning' },
  { key: 'error', label: 'error' },
  { key: 'background', label: 'background' },
  { key: 'surface', label: 'surface' },
  { key: 'surfaceCard', label: 'surfaceCard' },
  { key: 'backgroundSubtle', label: 'backgroundSubtle' },
  { key: 'textPrimary', label: 'textPrimary' },
  { key: 'textSecondary', label: 'textSecondary' },
  { key: 'textTertiary', label: 'textTertiary' },
  { key: 'textDisabled', label: 'textDisabled' },
  { key: 'borderDefault', label: 'borderDefault' },
  { key: 'borderSubtle', label: 'borderSubtle' },
  { key: 'backgroundDisabled', label: 'backgroundDisabled' },
];

export default function NovoProdutoScreen() {
  const [mode, setMode] = useState<Mode>('light');
  const theme = mode === 'light' ? novoProdutoLight : novoProdutoDark;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: theme.borderSubtle }]}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Novo Produto</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Preview das decisões de{' '}
          <Text style={{ fontWeight: '600' }}>ds-learning/global/foundations/fundacao-visual.md</Text>
          . Não é um produto oficial do ds-core ainda — spacing, radius, tipografia, elevação e motion
          são os mesmos da aba Tokens, aqui só a marca dele.
        </Text>

        <View style={[styles.toggle, { borderColor: theme.borderDefault }]}>
          {(['light', 'dark'] as Mode[]).map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setMode(m)}
              style={[styles.toggleOption, mode === m && { backgroundColor: theme.primary }]}
            >
              <Text style={{ color: mode === m ? '#fff' : theme.textPrimary, fontWeight: '600', fontSize: 13 }}>
                {m === 'light' ? 'Light' : 'Dark'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Marca</Text>
        <View style={styles.grid}>
          <Swatch label="primary" value={theme.primary} borderColor={theme.borderSubtle} textColor={theme.textPrimary} mutedColor={theme.textSecondary} />
          <Swatch label="accent" value={theme.accent} borderColor={theme.borderSubtle} textColor={theme.textPrimary} mutedColor={theme.textSecondary} />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginTop: 24 }]}>Gradient</Text>
        <View style={[styles.gradientPreview, { borderColor: theme.borderSubtle }]}>
          <View style={[styles.gradientStop, { backgroundColor: novoProdutoGradient.colors[0] }]} />
          <View style={[styles.gradientStop, { backgroundColor: novoProdutoGradient.colors[1] }]} />
        </View>
        <Text style={[styles.caption, { color: theme.textSecondary }]}>
          {novoProdutoGradient.colors[0]} → {novoProdutoGradient.colors[1]} (linear, horizontal). Preview
          simplificado em dois blocos — sem lib de gradiente instalada no playground ainda.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginTop: 24 }]}>Hover / Selecionado</Text>
        <View style={[styles.hoverDemo, { backgroundColor: theme.surface, borderColor: theme.borderSubtle }]}>
          <View style={[styles.hoverOverlay, { backgroundColor: novoProdutoPrimaryHover }]}>
            <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '600' }}>Item de menu</Text>
          </View>
        </View>
        <Text style={[styles.caption, { color: theme.textSecondary }]}>
          {novoProdutoPrimaryHover} — primary a 12% de opacidade. Regra específica de item de menu: mesmo
          valor para hover e para selecionado/ativo (ver seção "Hover e Selecionado" do documento).
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginTop: 24 }]}>
          Reaproveitado do tema default
        </Text>
        <View style={styles.grid}>
          {REUSED_SLOTS.map(({ key, label }) => (
            <Swatch
              key={key}
              label={label}
              value={theme[key] as string}
              borderColor={theme.borderSubtle}
              textColor={theme.textPrimary}
              mutedColor={theme.textSecondary}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Swatch({
  label,
  value,
  borderColor,
  textColor,
  mutedColor,
}: {
  label: string;
  value: string;
  borderColor: string;
  textColor: string;
  mutedColor: string;
}) {
  return (
    <View style={styles.item}>
      <View style={[styles.swatch, { backgroundColor: value, borderColor }]} />
      <Text style={[styles.slotName, { color: textColor }]}>{label}</Text>
      <Text style={[styles.slotValue, { color: mutedColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { padding: 20, borderBottomWidth: 1, gap: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 13, lineHeight: 18 },
  toggle: { flexDirection: 'row', borderRadius: 8, overflow: 'hidden', borderWidth: 1, alignSelf: 'flex-start' },
  toggleOption: { paddingHorizontal: 14, paddingVertical: 6 },
  content: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  item: { width: '44%', gap: 4 },
  swatch: { width: '100%', height: 48, borderRadius: 8, borderWidth: 1 },
  slotName: { fontSize: 12, fontWeight: '600' },
  slotValue: { fontSize: 11 },
  caption: { fontSize: 12, lineHeight: 16, marginTop: 8 },
  gradientPreview: { flexDirection: 'row', height: 56, borderRadius: 8, overflow: 'hidden', borderWidth: 1 },
  gradientStop: { flex: 1 },
  hoverDemo: { height: 72, borderRadius: 8, borderWidth: 1, justifyContent: 'center', padding: 4 },
  hoverOverlay: { flex: 1, borderRadius: 6, justifyContent: 'center', paddingHorizontal: 12 },
  bottomSpacer: { height: 32 },
});
