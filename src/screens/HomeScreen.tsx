import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions, Image, Linking, Platform } from 'react-native';
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
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AboutSection } from '../components/sections/AboutSection';
import { ContactSection } from '../components/sections/ContactSection';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sectionPositions, setSectionPositions] = useState({
    projects: 0,
    about: 0,
    contact: 0,
  });

  const handleSectionLayout = (key: 'projects' | 'about' | 'contact', event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions((prev) => ({ ...prev, [key]: y }));
  };

  const isWide = width >= 900;
  const activeProject = useMemo(
    () => ENGINEERING_PROJECTS.find((project) => project.id === activeProjectId) ?? ENGINEERING_PROJECTS[0],
    [activeProjectId],
  );

  useEffect(() => {
    if (typeof document !== 'undefined') {
      (document as any).title = 'Rana';
      const existing = (document as any).getElementById?.('signature-font');
      if (!existing) {
        const link = (document as any).createElement('link');
        link.id = 'signature-font';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
        (document as any).head?.appendChild(link);
      }
    }
  }, []);

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

  const handleResumeDownload = () => {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined') {
          const origin = window.location.origin;
          const pathname = window.location.pathname;
          // Extract base path to support subdirectory deployments (e.g. GitHub Pages)
          const basePath = pathname.substring(0, pathname.lastIndexOf('/') + 1);
          const url = `${origin}${basePath}pratyansha_rana_resume.pdf`;
          Linking.openURL(url);
        } else {
          Linking.openURL('/pratyansha_rana_resume.pdf');
        }
      } catch (error) {
        console.error('Error opening resume via location:', error);
        Linking.openURL('/pratyansha_rana_resume.pdf');
      }
    } else {
      try {
        const resumeAsset = require('../../assets/Resume/pratyansha_rana_resume.pdf');
        const resumeUrl = Image.resolveAssetSource(resumeAsset).uri;
        Linking.openURL(resumeUrl);
      } catch (error) {
        console.error('Error downloading resume:', error);
        Linking.openURL('/pratyansha_rana_resume.pdf');
      }
    }
  };

  const selectProject = (project: EngineeringProject) => {
    setActiveProjectId(project.id);
    setGalleryIndex(0);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" translucent />

      <View style={[
        styles.stickyHeader, 
        { top: insets.top > 0 ? insets.top + 12 : 16 },
        width < 680 && isMenuOpen && styles.stickyHeaderExpanded
      ]}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text aria-hidden style={[styles.signatureLogo, styles.signatureLogoGlow]}>
              Rana
            </Text>
            <Text style={styles.signatureLogo}>Rana</Text>
          </View>
          {width >= 680 ? (
            <>
              <View style={[styles.navLinks, { gap: width < 900 ? 20 : 36 }]}>
                <Pressable onPress={() => scrollToSection(sectionPositions.projects)}>
                  <Text style={styles.navLink}>Projects</Text>
                </Pressable>
                <Pressable onPress={() => scrollToSection(sectionPositions.about)}>
                  <Text style={styles.navLink}>About Me</Text>
                </Pressable>
                <Pressable onPress={() => scrollToSection(sectionPositions.contact)}>
                  <Text style={styles.navLink}>Contact</Text>
                </Pressable>
                <Pressable onPress={handleResumeDownload} style={styles.resumeHeaderBtn}>
                  <Text style={[styles.navLink, styles.resumeText]}>Resume</Text>
                </Pressable>
              </View>
              <Pressable onPress={() => scrollToSection(sectionPositions.contact)} style={styles.bookCall}>
                <Text style={styles.bookCallText}>Connect</Text>
                <ArrowUpRight size={11} color={C.white} strokeWidth={2} />
              </Pressable>
            </>
          ) : (
            <View style={styles.dropdownToggleContainer}>
              <Pressable 
                onPress={() => setIsMenuOpen(!isMenuOpen)} 
                style={[
                  styles.dropdownToggle, 
                  isMenuOpen && styles.dropdownToggleActive
                ]}
              >
                <Text style={[styles.dropdownToggleText, isMenuOpen && { color: C.ink }]}>Menu</Text>
                {isMenuOpen ? (
                  <X size={12} color={C.ink} strokeWidth={2} />
                ) : (
                  <ChevronDown size={12} color={C.white} strokeWidth={2} />
                )}
              </Pressable>
            </View>
          )}
        </View>

        {width < 680 && isMenuOpen && (
          <Animated.View entering={FadeIn.duration(200)} style={styles.mobileLinksContainer}>
            <Pressable onPress={() => { scrollToSection(sectionPositions.projects); setIsMenuOpen(false); }} style={styles.mobileLinkItem}>
              <Text style={styles.mobileLinkLabel}>PROJECTS</Text>
            </Pressable>
            <Pressable onPress={() => { scrollToSection(sectionPositions.about); setIsMenuOpen(false); }} style={styles.mobileLinkItem}>
              <Text style={styles.mobileLinkLabel}>ABOUT ME</Text>
            </Pressable>
            <Pressable onPress={() => { scrollToSection(sectionPositions.contact); setIsMenuOpen(false); }} style={styles.mobileLinkItem}>
              <Text style={styles.mobileLinkLabel}>CONTACT</Text>
            </Pressable>
            <Pressable onPress={() => { handleResumeDownload(); setIsMenuOpen(false); }} style={styles.mobileLinkItem}>
              <Text style={styles.mobileLinkLabel}>DOWNLOAD RESUME</Text>
            </Pressable>
            <Pressable 
              onPress={() => { scrollToSection(sectionPositions.contact); setIsMenuOpen(false); }} 
              style={styles.mobileCtaBtn}
            >
              <Text style={styles.mobileCtaText}>CONNECT</Text>
              <ArrowUpRight size={13} color={C.white} strokeWidth={2} />
            </Pressable>
          </Animated.View>
        )}
      </View>

      <Animated.ScrollView
        ref={scrollRef as React.RefObject<never>}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 84, paddingBottom: insets.bottom + 56 }]}
      >
        <HeroSection
          isWide={isWide}
          height={height}
          scrollY={scrollY}
          onProjectsPress={() => scrollToSection(sectionPositions.projects)}
          onAboutPress={handleResumeDownload}
        />

        <View onLayout={(e) => handleSectionLayout('projects', e)}>
          <ProjectsSection
            isWide={isWide}
            activeProject={activeProject}
            activeProjectId={activeProjectId}
            galleryIndex={galleryIndex}
            sceneState={sceneState}
            onSelectProject={selectProject}
            onImageSelect={setGalleryIndex}
          />
        </View>

        <View onLayout={(e) => handleSectionLayout('about', e)}>
          <AboutSection isWide={isWide} />
        </View>
        
        <View onLayout={(e) => handleSectionLayout('contact', e)}>
          <ContactSection />
        </View>
        
        <KresnaFooter />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.paper },
  content: { 
    paddingHorizontal: 24, 
    backgroundColor: C.paper,
    width: '100%',
  },
  stickyHeader: {
    position: 'absolute',
    left: 24,
    right: 24,
    backgroundColor: 'rgba(249, 249, 247, 0.9)',
    zIndex: 1000,
    borderWidth: 1,
    borderColor: 'rgba(17, 17, 17, 0.06)',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: C.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  header: { 
    minHeight: 38, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  signatureLogo: {
    color: '#17120A',
    fontFamily: 'Great Vibes, cursive',
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: 0.35,
    textShadowColor: 'rgba(226, 184, 91, 0.55)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  signatureLogoGlow: {
    position: 'absolute',
    color: 'rgba(197, 151, 60, 0.28)',
    textShadowColor: 'rgba(197, 151, 60, 0.42)',
    textShadowOffset: { width: 0.8, height: 0.8 },
    textShadowRadius: 1,
  },
  navLinks: { 
    flexDirection: 'row', 
    gap: 32, 
    alignItems: 'center' 
  },
  navLink: { 
    color: C.ink, 
    fontSize: 12, 
    fontWeight: '800',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  resumeHeaderBtn: {
    borderWidth: 1,
    borderColor: C.ink,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: C.white,
  },
  resumeText: {
    fontSize: 11,
    fontWeight: '900',
  },
  bookCall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: C.ink,
    backgroundColor: C.ink,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  bookCallText: { 
    color: C.white, 
    fontSize: 11, 
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  dropdownToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: C.ink,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: C.ink,
    borderRadius: 100,
  },
  dropdownToggleActive: {
    backgroundColor: C.white,
    borderColor: C.ink,
  },
  dropdownToggleText: {
    color: C.white,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  stickyHeaderExpanded: {
    borderRadius: 24,
    paddingBottom: 16,
  },
  mobileLinksContainer: {
    marginTop: 18,
    gap: 12,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(17, 17, 17, 0.08)',
    paddingTop: 16,
  },
  mobileLinkItem: {
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  mobileLinkLabel: {
    color: C.ink,
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  mobileCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: C.ink,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 100,
    marginTop: 8,
  },
  mobileCtaText: {
    color: C.white,
    fontSize: 12,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
});
