import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Modal, Dimensions, useWindowDimensions } from 'react-native';
import { Cpu, Code2, Globe, Database, Smartphone, Zap, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react-native';

import ThreePhoneModel from '../ThreePhoneModel';
import { C } from '../../constants/portfolioTheme';
import { ENGINEERING_PROJECTS, EngineeringProject, ProjectId } from '../../data/projects';

const getStackIcon = (index: number, color: string) => {
  const icons = [Cpu, Code2, Globe, Database, Smartphone, Zap];
  const IconComponent = icons[index % icons.length];
  return <IconComponent size={16} color={color} strokeWidth={1.5} />;
};

function TopProjectSwitcher({
  projects,
  activeProjectId,
  onSelect
}: {
  projects: EngineeringProject[];
  activeProjectId: ProjectId;
  onSelect: (project: EngineeringProject) => void;
}) {
  return (
    <View style={styles.topSwitcherContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topSwitcherContent}
      >
        {projects.map((proj, index) => {
          const isActive = proj.id === activeProjectId;
          return (
            <Pressable
              key={proj.id}
              onPress={() => onSelect(proj)}
              style={[styles.switcherButton, isActive && styles.switcherButtonActive]}
            >
              <Text style={[styles.switcherButtonNum, isActive && styles.switcherButtonTextActive]}>
                0{index + 1}
              </Text>
              <Text style={[styles.switcherButtonText, isActive && styles.switcherButtonTextActive]}>
                {proj.title}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function BentoProjectDetails({
  project,
  galleryIndex,
  onImageSelect,
}: {
  project: EngineeringProject;
  galleryIndex: number;
  onImageSelect: (index: number) => void;
}) {
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  return (
    <View style={styles.bentoContainer}>
      {/* Top Row */}
      <View style={[styles.bentoRow, isMobile && { flexDirection: 'column' }]}>
        <View style={[styles.bentoCard, styles.appShowcaseCard, { flex: isMobile ? undefined : 1.2 }]}>
          <View style={styles.badgePremium}>
            <Text style={styles.badgePremiumText}>SELECTED SYSTEM</Text>
          </View>
          <View style={styles.galleryStrip}>
            {project.gallery.slice(0, 2).map((item, index) => (
              <Pressable
                key={`${project.id}-${item.title}`}
                onPress={() => onImageSelect(index)}
                style={[styles.galleryThumb, index === galleryIndex && styles.galleryThumbActive]}
              >
                <View style={[styles.galleryTone, { backgroundColor: item.tone }]} />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.bentoCard, styles.metricCard, { flex: isMobile ? undefined : 0.8, paddingVertical: isMobile ? 24 : 16 }]}>
          <Text selectable style={styles.metricValue}>{project.coreMetric.split(' ')[0]}</Text>
          <Text selectable style={styles.metricLabel}>{project.coreMetric.substring(project.coreMetric.indexOf(' ') + 1)}</Text>
        </View>
      </View>

      {/* Middle Row */}
      <View style={[styles.bentoRow, isMobile && { flexDirection: 'column' }]}>
        <View style={[styles.bentoCard, { flex: isMobile ? undefined : 0.8, backgroundColor: C.paper }]}>
          <Text style={styles.cardKicker}>CORE STACK</Text>
          <View style={styles.stackList}>
            {project.stack.slice(0, 5).map((tech, i) => (
              <View key={tech} style={styles.stackListItem}>
                {getStackIcon(i, C.ink)}
                <Text selectable style={styles.stackListText} numberOfLines={1}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.bentoCard, styles.darkHeroCard, { flex: isMobile ? undefined : 1.5, minHeight: 240 }]}>
          <Text selectable style={styles.darkHeroKicker}>CASE STUDY: {project.title.toUpperCase()}</Text>
          <ScrollView 
            showsVerticalScrollIndicator={true} 
            indicatorStyle="white"
            style={styles.caseStudyScroll}
            contentContainerStyle={styles.caseStudyScrollContent}
          >
            <Text style={styles.caseStudyHeading}>THE CHALLENGE</Text>
            <Text selectable style={styles.caseStudyText}>{project.challenge}</Text>
            
            <Text style={styles.caseStudyHeading}>MY CONTRIBUTION</Text>
            <Text selectable style={styles.caseStudyText}>{project.contribution}</Text>
            
            <Text style={styles.caseStudyHeading}>BUSINESS & TECH IMPACT</Text>
            <Text selectable style={styles.caseStudyText}>{project.impact}</Text>
          </ScrollView>
        </View>
      </View>

      {/* Bottom Row */}
      <View style={[styles.bentoRow, isMobile && { flexDirection: 'column' }]}>
        <View style={[styles.bentoCard, { flex: isMobile ? undefined : 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }]}>
          <View>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>RELIABILITY</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.nicheLabel}>NICHE</Text>
            <Text style={styles.nicheValue}>{project.niche}</Text>
          </View>
        </View>

        <View style={[styles.bentoCard, styles.darkStatCard, { flex: isMobile ? undefined : 0.5, paddingVertical: 12 }]}>
          <Text style={styles.statValueDark}>V.1</Text>
          <Text style={styles.statLabelDark}>PRODUCTION</Text>
        </View>
      </View>
    </View>
  );
}

export function ProjectsSection({
  isWide,
  activeProject,
  activeProjectId,
  galleryIndex,
  sceneState,
  onSelectProject,
  onImageSelect,
}: {
  isWide: boolean;
  activeProject: EngineeringProject;
  activeProjectId: ProjectId;
  galleryIndex: number;
  sceneState: { scroll: number; motion: { x: number; y: number } };
  onSelectProject: (project: EngineeringProject) => void;
  onImageSelect: (index: number) => void;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { width } = useWindowDimensions();
  const isTiny = width < 450;
  const dynamicCanvasHeight = width < 450 ? 300 : 420;

  // Navigation Handlers
  const handlePrevImage = () => {
    if (galleryIndex > 0) {
      onImageSelect(galleryIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (galleryIndex < activeProject.gallery.length - 1) {
      onImageSelect(galleryIndex + 1);
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text selectable style={styles.sectionTitle}>Selected engineering systems</Text>
      </View>

      <TopProjectSwitcher 
        projects={ENGINEERING_PROJECTS}
        activeProjectId={activeProjectId}
        onSelect={onSelectProject}
      />
      
      <View style={[styles.projectWorkspace, isWide && styles.projectWorkspaceWide]}>
        
        {/* Left Side: Phone Showcase with Navigation Buttons */}
        <View style={[styles.phoneShowcaseWrapper, !isWide && { flex: undefined }]}>
          <Pressable 
            onPress={handlePrevImage} 
            style={[styles.navButton, { padding: isTiny ? 6 : 12, marginHorizontal: isTiny ? 4 : 10 }, galleryIndex === 0 && styles.navButtonDisabled]}
            disabled={galleryIndex === 0}
          >
            <ChevronLeft size={isTiny ? 18 : 24} color={galleryIndex === 0 ? C.muted : C.ink} />
          </Pressable>

          <View style={[styles.phoneShowcase, { height: dynamicCanvasHeight }]}>
            {/* Fullscreen Trigger Overlay */}
            <Pressable onPress={() => setIsFullscreen(true)} style={styles.expandButton}>
              <Maximize2 size={20} color={C.ink} />
            </Pressable>

            <ThreePhoneModel
              projects={ENGINEERING_PROJECTS}
              activeProjectId={activeProjectId}
              focusedProjectId={activeProjectId}
              galleryIndex={galleryIndex}
              singleMode
              scrollProgress={sceneState.scroll}
              motion={sceneState.motion}
              onSelect={() => setIsFullscreen(true)} // Open full screen on click
            />
          </View>

          <Pressable 
            onPress={handleNextImage} 
            style={[styles.navButton, { padding: isTiny ? 6 : 12, marginHorizontal: isTiny ? 4 : 10 }, galleryIndex === activeProject.gallery.length - 1 && styles.navButtonDisabled]}
            disabled={galleryIndex === activeProject.gallery.length - 1}
          >
            <ChevronRight size={isTiny ? 18 : 24} color={galleryIndex === activeProject.gallery.length - 1 ? C.muted : C.ink} />
          </Pressable>
        </View>

        {/* Right Side: Bento Grid Dashboard */}
        <View style={[styles.projectSide, !isWide && { flex: undefined }]}>
          <View style={styles.tabletFrame}>
            <BentoProjectDetails 
              project={activeProject} 
              galleryIndex={galleryIndex} 
              onImageSelect={onImageSelect} 
            />
          </View>
        </View>
      </View>

      {/* Full-Screen Modal */}
      <Modal
        visible={isFullscreen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsFullscreen(false)}
      >
        <View style={styles.fullscreenOverlay}>
          <Pressable style={styles.closeButton} onPress={() => setIsFullscreen(false)}>
            <X size={32} color="#ffffff" />
          </Pressable>

          <View style={styles.fullscreenContent}>
            <Pressable 
              onPress={handlePrevImage} 
              style={styles.fullscreenNavButton}
              disabled={galleryIndex === 0}
            >
              <ChevronLeft size={48} color={galleryIndex === 0 ? 'rgba(255,255,255,0.2)' : '#ffffff'} />
            </Pressable>

            <View style={styles.fullscreenPhoneContainer}>
              <ThreePhoneModel
                projects={ENGINEERING_PROJECTS}
                activeProjectId={activeProjectId}
                focusedProjectId={activeProjectId}
                galleryIndex={galleryIndex}
                singleMode
                scrollProgress={0}
                motion={{ x: 0, y: 0 }}
                onSelect={() => {}} // Do nothing in fullscreen mode
              />
            </View>

            <Pressable 
              onPress={handleNextImage} 
              style={styles.fullscreenNavButton}
              disabled={galleryIndex === activeProject.gallery.length - 1}
            >
              <ChevronRight size={48} color={galleryIndex === activeProject.gallery.length - 1 ? 'rgba(255,255,255,0.2)' : '#ffffff'} />
            </Pressable>
          </View>
          
          {/* Gallery Indicators in Fullscreen */}
          <View style={styles.fullscreenIndicators}>
            {activeProject.gallery.map((_, idx) => (
              <View 
                key={idx} 
                style={[styles.indicatorDot, idx === galleryIndex && styles.indicatorDotActive]} 
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  section: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: C.ink, paddingTop: 34, paddingBottom: 70 },
  sectionHeader: { gap: 12, marginBottom: 20, alignItems: 'center' },
  sectionTitle: { color: C.ink, fontSize: 36, lineHeight: 40, fontWeight: '300', textAlign: 'center' },
  
  topSwitcherContainer: { marginBottom: 32, width: '100%' },
  topSwitcherContent: { gap: 10, paddingHorizontal: 20, flexGrow: 1, justifyContent: 'center' },
  switcherButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: 100, 
    backgroundColor: C.paper,
    borderWidth: 1,
    borderColor: C.line,
  },
  switcherButtonActive: { backgroundColor: C.ink, borderColor: C.ink },
  switcherButtonNum: { fontSize: 11, fontWeight: '700', color: C.muted },
  switcherButtonText: { fontSize: 13, fontWeight: '600', color: C.ink },
  switcherButtonTextActive: { color: C.white },

  projectWorkspace: { gap: 32 },
  projectWorkspaceWide: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' },
  
  // Phone + Navigation Layout
  phoneShowcaseWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1, 
    maxWidth: 420, // slightly wider to accommodate buttons
    marginTop: 50 
  },
  phoneShowcase: { 
    height: 420, 
    flex: 1, 
    position: 'relative' 
  },
  navButton: {
    padding: 12,
    backgroundColor: C.paper,
    borderRadius: 30,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: C.line,
    zIndex: 10,
  },
  navButtonDisabled: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  expandButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    zIndex: 100,
  },

  projectSide: { flex: 1.5 },
  tabletFrame: { 
    backgroundColor: C.line, 
    padding: 8, 
    borderRadius: 24,
  },
  
  // Bento Grid System
  bentoContainer: { gap: 8, backgroundColor: C.paper, borderRadius: 20, padding: 8 },
  bentoRow: { flexDirection: 'row', gap: 8 },
  bentoCard: { 
    backgroundColor: C.white, 
    borderRadius: 12, 
    padding: 16,
    justifyContent: 'center',
  },
  
  appShowcaseCard: { backgroundColor: C.ink, overflow: 'hidden', padding: 0, justifyContent: 'flex-end' },
  badgePremium: { position: 'absolute', top: 12, left: 12, backgroundColor: C.white, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16, zIndex: 10 },
  badgePremiumText: { fontSize: 9, fontWeight: '800', color: C.ink },
  galleryStrip: { flexDirection: 'row', padding: 12, gap: 8 },
  galleryThumb: { flex: 1, height: 64, borderRadius: 6, overflow: 'hidden', opacity: 0.5 },
  galleryThumbActive: { opacity: 1, borderWidth: 2, borderColor: C.white },
  galleryTone: { flex: 1 },

  metricCard: { alignItems: 'center', backgroundColor: C.paper },
  metricValue: { fontSize: 36, fontWeight: '800', color: C.ink, marginBottom: 2 },
  metricLabel: { fontSize: 9, fontWeight: '700', color: C.muted, textAlign: 'center', textTransform: 'uppercase' },

  cardKicker: { fontSize: 9, fontWeight: '800', color: C.muted, marginBottom: 12 },
  stackList: { gap: 8 },
  stackListItem: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.white, padding: 8, borderRadius: 6 },
  stackListText: { fontSize: 12, fontWeight: '600', color: C.ink },

  darkHeroCard: { backgroundColor: '#111111', justifyContent: 'flex-start' },
  darkHeroKicker: { color: '#60A5FA', fontSize: 10, fontWeight: '800', marginBottom: 8, letterSpacing: 1 },
  darkHeroTitle: { color: C.white, fontSize: 24, lineHeight: 28, fontWeight: '600', marginBottom: 10 },
  caseStudyScroll: { flex: 1, marginTop: 4 },
  caseStudyScrollContent: { gap: 10, paddingBottom: 10 },
  caseStudyHeading: { color: '#60A5FA', fontSize: 9, fontWeight: '900', letterSpacing: 0.5, marginTop: 8 },
  caseStudyText: { color: '#E5E7EB', fontSize: 11, lineHeight: 15, fontWeight: '400' },

  statValue: { fontSize: 24, fontWeight: '800', color: C.ink },
  statLabel: { fontSize: 8, fontWeight: '700', color: C.muted, textTransform: 'uppercase', marginTop: 2 },
  nicheLabel: { fontSize: 8, fontWeight: '700', color: C.muted, textTransform: 'uppercase', marginBottom: 2 },
  nicheValue: { fontSize: 14, fontWeight: '600', color: C.ink },

  darkStatCard: { backgroundColor: C.ink, alignItems: 'center' },
  statValueDark: { fontSize: 20, fontWeight: '800', color: C.white },
  statLabelDark: { fontSize: 8, fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', marginTop: 2 },

  // Fullscreen Modal Styles
  fullscreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 100,
    padding: 10,
  },
  fullscreenContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    height: SCREEN_HEIGHT * 0.8,
  },
  fullscreenPhoneContainer: {
    flex: 1,
    height: '100%',
    maxWidth: SCREEN_WIDTH * 0.7,
  },
  fullscreenNavButton: {
    padding: 20,
  },
  fullscreenIndicators: {
    flexDirection: 'row',
    gap: 12,
    position: 'absolute',
    bottom: 50,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  indicatorDotActive: {
    backgroundColor: '#ffffff',
    width: 24,
  },
});