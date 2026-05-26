import React from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { C } from '../../constants/portfolioTheme';

export function AboutSection({ isWide }: { isWide: boolean }) {
  const { width } = useWindowDimensions();
  
  // Custom metrics data adapted to your engineering profile
  const STATS = [
    { label: 'YEARS OF EXPERIENCE', value: '02' },
    { label: 'PROJECTS COMPLETED', value: '20+' },
    { label: 'CORE COMPETENCIES', value: '05+' },
    { label: 'GLOBAL COMMITS', value: '124k+' },
  ];

  const isSmall = width < 480;
  const dynamicTitleSize = isSmall ? 30 : 44;
  const dynamicTitleLineHeight = isSmall ? 36 : 52;
  const isCenterAlign = !isWide && width <= 768;

  return (
    <View style={styles.container}>
      
      {/* 🌟 FOUR-POINTED STAR DECORATIONS (SVG/Text representations) */}
      <Text style={[styles.starIcon, { top: 40, left: '15%' }]}>✦</Text>
      <Text style={[styles.starIcon, { top: 70, right: '15%' }]}>✦</Text>

      {/* 1. EDITORIAL MAIN HEADLINE */}
      <Animated.View entering={FadeInUp.duration(700)} style={styles.headerContainer}>
        <Text style={[styles.mainTitle, { fontSize: dynamicTitleSize, lineHeight: dynamicTitleLineHeight }]}>
          Inspiration Starting{'\n'}From Designing
        </Text>
      </Animated.View>

      {/* 2. THE THREE-COLUMN ARCH MATRIX */}
      <View style={[styles.contentLayout, (isWide || width > 768) && styles.contentLayoutWide]}>
        
        {/* LEFT COLUMN: NARRATIVE PROSE */}
        <Animated.View entering={FadeInDown.duration(600).delay(200)} style={[styles.leftColumn, isCenterAlign && { alignItems: 'center', maxWidth: '100%' }]}>
          <View style={styles.textGroup}>
            <Text style={[styles.kicker, isCenterAlign && { textAlign: 'center' }]}>BACKGROUND ARCHITECT</Text>
            <Text style={[styles.bodyParagraph, isCenterAlign && { textAlign: 'center' }]}>
              Pratyansha Rana specializes in building full-stack cross-platform mobile apps using React Native, Expo, and advanced cryptography systems.
            </Text>
          </View>

          <View style={styles.textGroup}>
            <Text style={[styles.kicker, isCenterAlign && { textAlign: 'center' }]}>THE CORE MISSION</Text>
            <Text style={[styles.bodyParagraph, isCenterAlign && { textAlign: 'center' }]}>
              My goal is to always exceed client and recruiter expectations with high-performance mobile products where secure data layers feel considered.
            </Text>
          </View>
        </Animated.View>

        {/* CENTER COLUMN: THE NATIVE ARCH PHOTO FRAME */}
        <Animated.View entering={FadeInUp.duration(800).delay(100)} style={styles.centerColumn}>
          <View style={styles.archWrapper}>
            {/* Double border arch offset to replicate the frame style */}
            <View style={styles.archBorderInner}>
              <Image 
                source={require('../../../assets/mine.png')} 
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
          </View>
          <Text style={styles.captionText}>Engineer based in Bhopal, since 2024</Text>
        </Animated.View>

        {/* RIGHT COLUMN: HIGH-CONTRAST METRICS STACK */}
        <Animated.View entering={FadeInDown.duration(600).delay(300)} style={[styles.rightColumn, isCenterAlign && { alignItems: 'center', maxWidth: undefined }]}>
          {STATS.map((stat, idx) => (
            <View key={idx} style={[styles.statCard, isCenterAlign && { alignItems: 'center' }]}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </Animated.View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: C.background,
    paddingHorizontal: 24,
    paddingVertical: 60,
    position: 'relative',
    width: '100%',
  },
  starIcon: {
    position: 'absolute',
    color: C.ink,
    fontSize: 24,
    opacity: 0.8,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  mainTitle: {
    color: C.ink,
    fontSize: 44,
    lineHeight: 52,
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: -0.5,
    fontFamily: 'serif', // Fallback to premium system serif matching your typewriter inspiration
  },
  contentLayout: {
    flexDirection: 'column',
    gap: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLayoutWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    gap: 32,
    maxWidth: 320,
  },
  textGroup: {
    gap: 8,
  },
  kicker: {
    color: C.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  bodyParagraph: {
    color: C.ink,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'justify',
  },
  centerColumn: {
    alignItems: 'center',
    gap: 12,
  },
  archWrapper: {
    width: 280,
    height: 380,
    borderTopLeftRadius: 140, // Creating the clean geometric arched frame curve
    borderTopRightRadius: 140,
    borderWidth: 1,
    borderColor: 'rgba(17, 17, 17, 0.15)',
    padding: 6,
    backgroundColor: 'transparent',
  },
  archBorderInner: {
    flex: 1,
    borderTopLeftRadius: 134,
    borderTopRightRadius: 134,
    overflow: 'hidden', // Clips your picture perfectly inside the arch shape boundary
    backgroundColor: '#EAEAEA',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  captionText: {
    color: C.muted,
    fontSize: 11,
    fontFamily: 'monospace',
    marginTop: 6,
  },
  rightColumn: {
    flex: 1,
    gap: 24,
    maxWidth: 240,
    alignItems: 'flex-end',
  },
  statCard: {
    alignItems: 'flex-end',
    width: '100%',
  },
  statLabel: {
    color: C.muted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  statValue: {
    color: C.ink,
    fontSize: 38,
    fontWeight: '300',
    lineHeight: 42,
    fontFamily: 'serif',
  },
});