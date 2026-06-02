import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Modal, Dimensions, useWindowDimensions, Platform, Linking } from 'react-native';
import { Cpu, Code2, Globe, Database, Smartphone, Zap, ChevronLeft, ChevronRight, Maximize2, X, ArrowUpRight } from 'lucide-react-native';

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

function ProductionPhoneMockup({
  project,
  galleryIndex,
  isExpanded = false,
}: {
  project: EngineeringProject;
  galleryIndex: number;
  isExpanded?: boolean;
}) {
  const isQubes = project.id === 'qubes-messenger';
  const isCivic = project.id === 'citizenvote';
  const isMarket = project.id === 'velocity-market';

  // Mathematical precision to achieve a perfect 9:16 aspect ratio under dynamic height constraints
  const maxBezelHeight = isExpanded ? Math.min(668, SCREEN_HEIGHT * 0.75) : 472;
  const bezelBorderWidth = isExpanded ? 14 : 12;
  const bezelPadding = bezelBorderWidth * 2;
  
  const screenHeight = maxBezelHeight - bezelPadding;
  const screenWidth = screenHeight * 9 / 16;
  
  const bezelWidth = screenWidth + bezelPadding;
  const bezelHeight = maxBezelHeight;
  
  const bezelRadius = isExpanded ? 36 : 28;
  const iframeRadius = isExpanded ? 22 : 16;

  const islandWidth = isExpanded ? 110 : 84;
  const islandHeight = isExpanded ? 24 : 18;
  const islandRadius = isExpanded ? 12 : 9;

  const statusBarHeight = isExpanded ? 36 : 28;
  const statusPadding = isExpanded ? 24 : 18;

  const screenPaddingTop = isExpanded ? 44 : 36;

  // Crucial: Hiding simulated headers on Web Live App to avoid duplicate headers and ensure "every pixel is visible"
  const showSimulatedOverlays = !(isQubes && Platform.OS === 'web');

  const renderScreenContent = () => {
    if (isQubes) {
      if (Platform.OS === 'web') {
        return (
          <iframe
            src="https://phantom-w9di.vercel.app/"
            scrolling="yes"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#000000',
              zIndex: 1,
              borderRadius: iframeRadius,
              overflow: 'auto',
            }}
            title="Phantom Core"
          />
        );
      }
      if (galleryIndex === 0) {
        return (
          <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#0B0B0F' }]}>
            <Text style={styles.screenHeader}>QUANTUM SECURE</Text>
            <View style={styles.quantumGraph}>
              <Text style={styles.quantumText}>[ BB84 PROTOCOL ]</Text>
              <Text style={styles.quantumSub}>Polarization: 0° / 45° / 90°</Text>
              <View style={styles.quantumMatrix}>
                <Text style={styles.matrixRow}>|0⟩  ↗  |1⟩  →  ↗  |0⟩</Text>
                <Text style={styles.matrixRow}>Key: 1 0 1 1 0 1 0 0</Text>
              </View>
            </View>
            <View style={styles.statusBadgeGreen}>
              <Text style={styles.statusText}>NEGOTIATION COMPLETE</Text>
            </View>
          </View>
        );
      }
      if (galleryIndex === 1) {
        return (
          <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#0F0E13' }]}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>PHANTOM CORE</Text>
              <Text style={styles.chatSubtitle}>• Kyber-1024 Active</Text>
            </View>
            <View style={styles.chatFeed}>
              <View style={styles.chatBubbleLeft}>
                <Text style={styles.chatTextLeft}>Decrypting post-quantum packet...</Text>
              </View>
              <View style={styles.chatBubbleRight}>
                <Text style={styles.chatTextRight}>Handshake complete. Latency: 43ms.</Text>
              </View>
              <View style={styles.chatBubbleLeft}>
                <Text style={styles.chatTextLeft}>Secure defense channel established.</Text>
              </View>
            </View>
          </View>
        );
      }
      return (
        <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#0D0D0D' }]}>
          <Text style={styles.screenHeader}>KEY TRACE MONITOR</Text>
          <ScrollView contentContainerStyle={styles.matrixContainer}>
            <Text style={styles.matrixLog}>[11:04:32] Kyber Key encapsulating...</Text>
            <Text style={styles.matrixLog}>[11:04:32] Alice Shared Secret Generated</Text>
            <Text style={styles.matrixLog}>[11:04:32] Bob Shared Secret Generated</Text>
            <Text style={styles.matrixLog}>[11:04:32] Trace: 7F3A A9B1 C0E4 2F34</Text>
            <Text style={styles.matrixLog}>[11:04:32] Keys matched successfully.</Text>
          </ScrollView>
        </View>
      );
    }

    if (isCivic) {
      if (galleryIndex === 0) {
        return (
          <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#EFEFEF' }]}>
            <View style={styles.cameraHeader}>
              <Text style={[styles.screenHeader, { color: C.ink }]}>LOK AWAZ CAMERA</Text>
            </View>
            <View style={styles.cameraContainer}>
              <View style={styles.hazardOverlay}>
                <Text style={styles.hazardTitle}>POTHOLE DETECTED</Text>
                <Text style={styles.hazardConfidence}>Confidence: 94.6%</Text>
              </View>
            </View>
            <View style={styles.statusBadgeAmber}>
              <Text style={[styles.statusText, { color: C.ink }]}>ROUTING TO MUNICIPALITY</Text>
            </View>
          </View>
        );
      }
      return (
        <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#F5F5F3' }]}>
          <Text style={[styles.screenHeader, { color: C.ink }]}>ZK-PROOF IDENTITY</Text>
          <View style={styles.identityCard}>
            <Text style={styles.idHash}>Hash: 0x9f32...8e21</Text>
            <View style={styles.statusBadgeGreen}>
              <Text style={styles.statusText}>VERIFIED ANONYMOUS</Text>
            </View>
          </View>
        </View>
      );
    }

    if (isMarket) {
      if (galleryIndex === 0) {
        return (
          <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#F9F9F7' }]}>
            <Text style={[styles.screenHeader, { color: C.ink }]}>GEAR SWAP</Text>
            <View style={styles.marketGrid}>
              <View style={styles.marketItem}>
                <Text style={styles.itemTitle}>LNCT Dorm Lamp</Text>
                <Text style={styles.itemPrice}>₹350</Text>
              </View>
              <View style={styles.marketItem}>
                <Text style={styles.itemTitle}>Calculus Book</Text>
                <Text style={styles.itemPrice}>₹180</Text>
              </View>
            </View>
          </View>
        );
      }
      if (galleryIndex === 1) {
        return (
          <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#FFFFFF' }]}>
            <Text style={[styles.screenHeader, { color: C.ink }]}>STRIPE CHECKOUT</Text>
            <View style={styles.checkoutForm}>
              <Text style={styles.checkoutLabel}>Total Amount: ₹180</Text>
              <View style={styles.payInput}>
                <Text style={styles.payText}>•••• •••• •••• 4242</Text>
              </View>
              <View style={styles.payBtn}>
                <Text style={styles.payBtnText}>Pay Securely</Text>
              </View>
            </View>
          </View>
        );
      }
      return (
        <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#F9F9F7' }]}>
          <Text style={[styles.screenHeader, { color: C.ink }]}>TRANSACTION SYNC</Text>
          <View style={styles.syncState}>
            <Text style={styles.syncVal}>100% SUCCESS</Text>
            <Text style={styles.syncText}>Offline transactional queue synced globally under 120ms.</Text>
          </View>
        </View>
      );
    }

    if (galleryIndex === 0) {
      return (
        <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#090F0D' }]}>
          <Text style={styles.screenHeader}>BB84 SIMULATOR</Text>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>Perturbation Key Rate</Text>
            <Text style={styles.graphSub}>Noise Ratio: 4.2%</Text>
            <View style={styles.visualGraphBar} />
          </View>
        </View>
      );
    }
    if (galleryIndex === 1) {
      return (
        <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#0B0B0F' }]}>
          <Text style={styles.screenHeader}>PERTURBATIONS MAP</Text>
          <View style={styles.noiseMatrix}>
            <Text style={styles.matrixLog}>Eavesdropping (Eve): NONE</Text>
            <Text style={styles.matrixLog}>QBER: 0.024 (Normal)</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={[styles.screenContent, { paddingTop: screenPaddingTop, backgroundColor: '#0D0D0D' }]}>
        <Text style={styles.screenHeader}>BENCHMARK RESULTS</Text>
        <View style={styles.benchmarkCard}>
          <Text style={styles.benchVal}>98.4% EFFICIENCY</Text>
          <Text style={styles.benchLabel}>Topological Quantum Simulation Complete</Text>
        </View>
      </View>
    );
  };

  // Gorgeous 3D perspective rotation tilt styles for the non-expanded state
  const rotateStyle = isExpanded ? {} : {
    transform: [
      { perspective: 1200 },
      { rotateY: '-13deg' },
      { rotateX: '7deg' },
      { rotateZ: '-1.5deg' },
    ] as any
  };

  return (
    <View style={styles.iphoneOuter}>
      {/* 3D Side Depth Plate (extrudes the phone's thickness for high-fidelity 3D shadow depth) */}
      {!isExpanded && (
        <View style={[
          styles.iphoneBezel3dSide,
          {
            width: bezelWidth,
            height: bezelHeight,
            borderRadius: bezelRadius,
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -(bezelWidth / 2) + 12,
            marginTop: -(bezelHeight / 2) + 6,
            transform: [
              { perspective: 1200 },
              { rotateY: '-13deg' },
              { rotateX: '7deg' },
              { rotateZ: '-1.5deg' },
            ] as any
          }
        ]} />
      )}

      {/* Main Bezel */}
      <View style={[
        styles.iphoneBezel,
        {
          width: bezelWidth,
          height: bezelHeight,
          borderRadius: bezelRadius,
          borderWidth: bezelBorderWidth,
        },
        rotateStyle
      ]}>
        {showSimulatedOverlays && (
          <View pointerEvents="none" style={[
            styles.iphoneIsland,
            {
              width: islandWidth,
              height: islandHeight,
              borderRadius: islandRadius,
              marginLeft: -(islandWidth / 2),
            }
          ]} />
        )}
        {showSimulatedOverlays && (
          <View pointerEvents="none" style={[
            styles.iphoneStatusBar,
            {
              height: statusBarHeight,
              paddingHorizontal: statusPadding,
            }
          ]}>
            <Text style={styles.statusTime}>9:41</Text>
            <View style={styles.statusIcons}>
              <Text style={styles.statusIconText}>📶</Text>
              <Text style={styles.statusIconText}>🔋</Text>
            </View>
          </View>
        )}
        {renderScreenContent()}
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
  const dynamicCanvasHeight = width < 450 ? 350 : 500;

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

            {/* Launch App Button */}
            {activeProject.id === 'qubes-messenger' && (
              <Pressable 
                onPress={() => Linking.openURL('https://phantom-w9di.vercel.app/')}
                style={styles.launchButton}
              >
                <Text style={styles.launchButtonText}>Launch Live App</Text>
                <ArrowUpRight size={11} color={C.white} strokeWidth={2.5} />
              </Pressable>
            )}

            <ProductionPhoneMockup
              project={activeProject}
              galleryIndex={galleryIndex}
              isExpanded={false}
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
              {activeProject.id === 'qubes-messenger' && (
                <Pressable 
                  onPress={() => Linking.openURL('https://phantom-w9di.vercel.app/')}
                  style={styles.fullscreenLaunchButton}
                >
                  <Text style={styles.launchButtonText}>Launch Live App</Text>
                  <ArrowUpRight size={12} color={C.white} strokeWidth={2.5} />
                </Pressable>
              )}

              <ProductionPhoneMockup
                project={activeProject}
                galleryIndex={galleryIndex}
                isExpanded={true}
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
    maxWidth: 440, // slightly wider to accommodate larger button space
    marginTop: 50 
  },
  phoneShowcase: { 
    height: 500, 
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
  launchButton: {
    position: 'absolute',
    bottom: 24,
    left: '50%',
    transform: [{ translateX: -70 }] as any,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.ink,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    zIndex: 101,
    shadowColor: C.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  fullscreenLaunchButton: {
    position: 'absolute',
    bottom: -60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.ink,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    zIndex: 101,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  launchButtonText: {
    color: C.white,
    fontSize: 10,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
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
  // Production-grade iPhone Mockup Styles
  iphoneOuter: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iphoneBezel: {
    borderColor: '#1e1e24',
    backgroundColor: C.ink,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  iphoneBezel3dSide: {
    backgroundColor: '#0c0c0f',
    borderWidth: 1,
    borderColor: '#23232a',
    zIndex: 0,
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 20 },
    shadowOpacity: 0.38,
    shadowRadius: 28,
    elevation: 4,
  },
  iphoneIsland: {
    position: 'absolute',
    top: 6,
    left: '50%',
    marginLeft: -38,
    width: 76,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#000000',
    zIndex: 999,
  },
  iphoneStatusBar: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    position: 'absolute',
    top: 4,
    left: 0,
    right: 0,
    zIndex: 998,
  },
  statusTime: {
    color: '#8A8A8A',
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 4,
  },
  statusIconText: {
    fontSize: 9,
  },
  screenContent: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenHeader: {
    color: '#8A8D90',
    fontSize: 10,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 8,
  },
  quantumGraph: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },
  quantumText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  quantumSub: {
    color: C.muted,
    fontSize: 8,
    fontFamily: 'monospace',
  },
  quantumMatrix: {
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#30363D',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    alignItems: 'center',
    gap: 4,
  },
  matrixRow: {
    color: '#8B949E',
    fontSize: 8,
    fontFamily: 'monospace',
  },
  statusBadgeGreen: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  statusBadgeAmber: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: '#F59E0B',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  statusText: {
    color: '#10B981',
    fontSize: 8,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  chatHeader: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2F343F',
    paddingBottom: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  chatTitle: {
    color: C.white,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  chatSubtitle: {
    color: '#10B981',
    fontSize: 7,
    fontWeight: '900',
    fontFamily: 'monospace',
    marginTop: 2,
  },
  chatFeed: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
  chatBubbleLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#23252F',
    padding: 8,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    maxWidth: '85%',
  },
  chatBubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: C.white,
    padding: 8,
    borderRadius: 12,
    borderTopRightRadius: 0,
    maxWidth: '85%',
  },
  chatTextLeft: {
    color: '#D1D5DB',
    fontSize: 9,
    lineHeight: 12,
  },
  chatTextRight: {
    color: C.ink,
    fontSize: 9,
    lineHeight: 12,
  },
  matrixContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    gap: 6,
  },
  matrixLog: {
    color: '#6EE7B7',
    fontSize: 7,
    fontFamily: 'monospace',
    lineHeight: 10,
  },
  cameraHeader: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#D1D5DB',
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 10,
  },
  hazardOverlay: {
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    borderWidth: 2,
    borderColor: '#EF4444',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  hazardTitle: {
    color: C.white,
    fontSize: 9,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  hazardConfidence: {
    color: C.white,
    fontSize: 7,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  identityCard: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  idHash: {
    color: C.ink,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  marketGrid: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
  marketItem: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 8,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    color: C.ink,
    fontSize: 10,
    fontWeight: '800',
  },
  itemPrice: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  checkoutForm: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    gap: 12,
  },
  checkoutLabel: {
    color: C.ink,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  payInput: {
    borderWidth: 1,
    borderColor: C.line,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  payText: {
    color: C.ink,
    fontSize: 9,
    fontFamily: 'monospace',
  },
  payBtn: {
    backgroundColor: '#635BFF',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  payBtnText: {
    color: C.white,
    fontSize: 10,
    fontWeight: '800',
  },
  syncState: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  syncVal: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  syncText: {
    color: C.charcoal,
    fontSize: 8,
    textAlign: 'center',
    lineHeight: 12,
  },
  graphContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  graphTitle: {
    color: '#6EE7B7',
    fontSize: 10,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  graphSub: {
    color: C.muted,
    fontSize: 8,
    fontFamily: 'monospace',
  },
  visualGraphBar: {
    height: 8,
    backgroundColor: '#10B981',
    borderRadius: 4,
    width: '80%',
    marginTop: 4,
  },
  noiseMatrix: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  benchmarkCard: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  benchVal: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  benchLabel: {
    color: '#9CA3AF',
    fontSize: 8,
    textAlign: 'center',
    lineHeight: 12,
  },
});