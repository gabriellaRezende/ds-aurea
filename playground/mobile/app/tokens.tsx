import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlayground } from '../context/PlaygroundContext';
import { PlaygroundHeader } from '../components/PlaygroundHeader';
import { ColorSection } from '../components/tokens/ColorSection';
import { SpacingSection } from '../components/tokens/SpacingSection';
import { RadiusSection } from '../components/tokens/RadiusSection';
import { TypographySection } from '../components/tokens/TypographySection';
import { ElevationSection } from '../components/tokens/ElevationSection';
import { MotionSection } from '../components/tokens/MotionSection';

export default function TokensScreen() {
  const { theme } = usePlayground();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <PlaygroundHeader />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ColorSection />
        <SpacingSection />
        <RadiusSection />
        <TypographySection />
        <ElevationSection />
        <MotionSection />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 20 },
  bottomSpacer: { height: 32 },
});
