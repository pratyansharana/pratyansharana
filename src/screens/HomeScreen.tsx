import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Gyroscope } from 'expo-sensors';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ArrowUpRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AboutSection } from '../components/sections/AboutSection';

import { HeroSection } from '../components/sections/HeroSection';
import { KresnaFooter } from '../components/sections/KresnaFooter';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { C } from '../constants/portfolioTheme';
import { ENGINEERING_PROJECTS, EngineeringProject, ProjectId } from '../data/projects';

declare const document: unknown;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const scrollRef = useRef<ScrollView | null>(null);
  const scrollY = useSharedValue(0);
  const motionX = useSharedValue(0);
  const motionY = useSharedValue(0);
  const [activeProjectId, setActiveProjectId] = useState<ProjectId>('qubes-messenger');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [sceneState, setSceneState] = useState({ scroll: 0, motion: { x: 0, y: 0 } });

  const isWide = width >= 900;
  const activeProject = useMemo(
    () => ENGINEERING_PROJECTS.find((project) => project.id === activeProjectId) ?? ENGINEERING_PROJECTS[0],
    [activeProjectId],
  );

  useEffect(() => {
    if (typeof document !== 'undefined') return undefined;

    Gyroscope.setUpdateInterval(33);
    const subscription = Gyroscope.addListener(({ x, y }) => {
      motionX.value = withSpring(Math.max(-1, Math.min(1, y)), { damping: 18, stiffness: 90 });
      motionY.value = withSpring(Math.max(-1, Math.min(1, x)), { damping: 18, stiffness: 90 });
    });

    return () => subscription.remove();
  }, [motionX, motionY]);

  useAnimatedReaction(
    () => ({
      scroll: interpolate(scrollY.value, [0, height], [0, 1], Extrapolate.CLAMP),
      motion: { x: motionX.value, y: motionY.value },
    }),
    (value) => runOnJS(setSceneState)(value),
    [height],
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const scrollToSection = (y: number) => {
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  const selectProject = (project: EngineeringProject) => {
    setActiveProjectId(project.id);
    setGalleryIndex(0);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" translucent />

      <Animated.ScrollView
        ref={scrollRef as React.RefObject<never>}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        decelerationRate="fast"
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 14, paddingBottom: insets.bottom + 56 }]}
      >
        <View style={styles.header}>
          <Text style={styles.brandMark}>PR</Text>
          <View style={styles.navLinks}>
            <Pressable onPress={() => scrollToSection(height * 0.92)}>
              <Text style={styles.navLink}>Projects</Text>
            </Pressable>
            <Pressable onPress={() => scrollToSection(height * 1.9)}>
              <Text style={styles.navLink}>About Me</Text>
            </Pressable>
            <Pressable onPress={() => scrollToSection(height * 2.55)}>
              <Text style={styles.navLink}>Contact</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => scrollToSection(height * 2.55)} style={styles.bookCall}>
            <Text style={styles.bookCallText}>Book A Call</Text>
            <ArrowUpRight size={12} color={C.ink} strokeWidth={1.5} />
          </Pressable>
        </View>

        <HeroSection
          isWide={isWide}
          height={height}
          scrollY={scrollY}
          onProjectsPress={() => scrollToSection(height * 0.92)}
          onAboutPress={() => scrollToSection(height * 1.9)}
        />

        <ProjectsSection
          isWide={isWide}
          activeProject={activeProject}
          activeProjectId={activeProjectId}
          galleryIndex={galleryIndex}
          sceneState={sceneState}
          onSelectProject={selectProject}
          onImageSelect={setGalleryIndex}
        />

        <AboutSection isWide={isWide} />
        
        <KresnaFooter />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.paper },
  content: { paddingHorizontal: 22, backgroundColor: C.paper },
  header: { minHeight: 38, flexDirection: 'row', alignItems: 'center', gap: 18 },
  brandMark: { color: C.ink, fontSize: 23, fontWeight: '900' },
  navLinks: { flex: 1, flexDirection: 'row', gap: 100, justifyContent: 'center' },
  navLink: { color: C.ink, fontSize: 13, fontWeight: '800' },
  bookCall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.ink,
    paddingBottom: 2,
  },
  bookCallText: { color: C.ink, fontSize: 12, fontWeight: '900' },
});
