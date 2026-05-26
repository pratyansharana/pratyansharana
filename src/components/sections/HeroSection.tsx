import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import { ArrowDown } from 'lucide-react-native';

import { C, portrait } from '../../constants/portfolioTheme';

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.metric}>
      <Text selectable style={styles.metricValue}>{value}</Text>
      <Text selectable style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function AnimatedCharacter({ char, index, scrollY, fontSize, lineHeight }: { char: string; index: number; scrollY: SharedValue<number>; fontSize: number; lineHeight: number }) {
  const animatedStyle = useAnimatedStyle(() => {
    const start = index * 5;
    const opacity = interpolate(scrollY.value, [start, start + 180], [1, 0.26], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [start, start + 220], [0, -26], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  return <Animated.Text style={[styles.heroChar, { fontSize, lineHeight }, animatedStyle]}>{char === ' ' ? '\u00A0' : char}</Animated.Text>;
}

function FadeCharacters({ text, scrollY, fontSize, lineHeight }: { text: string; scrollY: SharedValue<number>; fontSize: number; lineHeight: number }) {
  return (
    <View style={styles.characterWrap}>
      {text.split('').map((char, index) => (
        <AnimatedCharacter key={`${char}-${index}`} char={char} index={index} scrollY={scrollY} fontSize={fontSize} lineHeight={lineHeight} />
      ))}
    </View>
  );
}

export function HeroSection({
  isWide,
  height,
  scrollY,
  onProjectsPress,
  onAboutPress,
}: {
  isWide: boolean;
  height: number;
  scrollY: SharedValue<number>;
  onProjectsPress: () => void;
  onAboutPress: () => void;
}) {
  const { width } = useWindowDimensions();
  const portraitStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(scrollY.value, [0, height], [0, -42], Extrapolate.CLAMP) },
      { scale: interpolate(scrollY.value, [0, height], [1, 1.035], Extrapolate.CLAMP) },
    ] as const,
  }));

  // Dynamic calculations for premium mobile typography
  const dynamicFontSize = Math.min(110, width * 0.21);
  const dynamicLineHeight = dynamicFontSize * 1.05;
  const dynamicPortraitHeight = width < 600 ? Math.min(360, width * 0.85) : 520;

  return (
    <>
      <View style={[styles.hero, isWide && styles.heroWide, { minHeight: Math.max(600, height - 42) }]}>
        <View style={styles.heroLeft}>
          <View style={styles.metricsRow}>
            <Metric value="+24" label="Project completed" />
            <Metric value="+9" label="Startup grade builds" />
          </View>
          <FadeCharacters text="Hello" scrollY={scrollY} fontSize={dynamicFontSize} lineHeight={dynamicLineHeight} />
          <Text selectable style={styles.roleLine}>
            - It's Pratyansha, a React Native and intelligent systems developer building fast mobile products with a premium editorial eye.
          </Text>
          <View style={styles.heroActions}>
            <Pressable onPress={onProjectsPress} style={styles.primaryAction}>
              <Text style={styles.primaryActionText}>View Projects</Text>
              <ArrowDown size={14} color={C.white} strokeWidth={1.5} />
            </Pressable>
            <Pressable onPress={onAboutPress} style={styles.secondaryAction}>
              <Text style={styles.secondaryActionText}>About Me</Text>
            </Pressable>
          </View>
        </View>

        <Animated.View style={[styles.portraitWrap, isWide && styles.portraitWrapWide, { minHeight: dynamicPortraitHeight }, portraitStyle]}>
          <Image source={portrait} resizeMode="contain" style={styles.portrait} />
          <View style={styles.portraitFadeTop} />
        </Animated.View>
      </View>
      <View style={styles.scrollCue}>
        <Text style={styles.scrollText}>Scroll down</Text>
        <ArrowDown size={12} color={C.ink} strokeWidth={1.4} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  hero: { paddingTop: 4, gap: 34 },
  heroWide: { flexDirection: 'row', alignItems: 'stretch' },
  heroLeft: { flex: 1, justifyContent: 'center', paddingLeft: 20, zIndex: 2 },
  metricsRow: { flexDirection: 'row', gap: 30, marginBottom: 52 },
  metric: { gap: 1 },
  metricValue: { color: C.ink, fontSize: 35, fontWeight: '300', fontVariant: ['tabular-nums'] },
  metricLabel: { color: C.muted, fontSize: 12, lineHeight: 13 },
  characterWrap: { flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'flex-end' },
  heroChar: { color: C.ink, fontSize: 110, lineHeight: 116, fontWeight: '200', letterSpacing: 0 },
  roleLine: {
    maxWidth: 440,
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: C.ink,
    color: C.charcoal,
    fontSize: 18,
    lineHeight: 24, // Fix line-height issue to allow wrapping text
  },
  heroActions: { flexDirection: 'row', gap: 10, marginTop: 28 },
  primaryAction: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.ink, paddingHorizontal: 18, paddingVertical: 12 },
  primaryActionText: { color: C.white, fontSize: 12, fontWeight: '700' },
  secondaryAction: { borderWidth: StyleSheet.hairlineWidth, borderColor: C.line, paddingHorizontal: 18, paddingVertical: 12 },
  secondaryActionText: { color: C.ink, fontSize: 12, fontWeight: '700' },
  portraitWrap: { minHeight: 520, backgroundColor: C.paper, overflow: 'visible' },
  portraitWrapWide: { flex: 1, minHeight: 640 },
  portrait: { width: '100%', height: '100%' },
  portraitFadeTop: { position: 'absolute', left: 0, top: 0, right: 0, height: 78, backgroundColor: 'rgba(249,249,247,0.42)' },
  scrollCue: { flexDirection: 'row', alignItems: 'center', gap: 6, marginLeft: 20, paddingBottom: 56 },
  scrollText: { color: C.ink, fontSize: 10 },
});
