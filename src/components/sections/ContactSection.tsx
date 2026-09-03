import React from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions, Linking } from 'react-native';
import { ArrowUpRight, Sparkles } from 'lucide-react-native';

import { C } from '../../constants/portfolioTheme';

export function ContactSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const handleEmailPress = () => {
    Linking.openURL('mailto:pratyansharana1@gmail.com'); // Put a real email address helper
  };

  const handleStartProject = () => {
    Linking.openURL('mailto:pratyansharana1@gmail.com?subject=Project%20Inquiry');
  };

  const DIRECTORY = [
    { label: 'EMAIL', value: 'pratyansharana1@gmail.com', link: 'mailto:pratyansharana1@gmail.com' },
    { label: 'LOCATION', value: 'Bhopal, India / Remote', link: null },
    { label: 'GITHUB', value: 'github.com/pratyansharana', link: 'https://github.com/pratyansharana' },
    { label: 'LINKEDIN', value: 'linkedin.com/in/pratyansh-rana', link: 'https://www.linkedin.com/in/pratyansha-rana-99699b306/' },
  ];

  const renderStartButton = () => (
    <Pressable onPress={handleStartProject} style={[styles.startBtn, isMobile && { alignSelf: 'stretch', marginTop: 24 }]}>
      <Text style={styles.startBtnText}>START A CONVERSATION</Text>
      <ArrowUpRight size={14} color={C.white} strokeWidth={1.8} />
    </Pressable>
  );

  return (
    <View style={styles.section}>
      <View style={[styles.layout, isMobile && styles.layoutMobile]}>
        
        {/* Left Side: Editorial Pitch */}
        <View style={styles.leftSide}>
          <View style={styles.contactBadge}>
            <Sparkles size={13} color={C.ink} strokeWidth={1.8} />
            <Text style={styles.contactBadgeText}>AVAILABLE FOR SELECT BUILDS</Text>
          </View>
          
          <Text selectable style={styles.contactTitle}>
            Let's build a mobile experience that feels fast, calm, and <Text style={styles.italicSerif}>unmistakably premium.</Text>
          </Text>
          
          <Text selectable style={styles.contactBody}>
            I am open to high-performance React Native apps, Expo native prototypes, 3D portfolios, and intelligent hardware-inferred mobile interfaces.
          </Text>
          
          {!isMobile && renderStartButton()}
        </View>

        {/* Right Side: Dotted Directory Index */}
        <View style={styles.rightSide}>
          <Text style={styles.directoryHeader}>[ DIRECTORY INDEX ]</Text>
          
          <View style={styles.directoryContainer}>
            {DIRECTORY.map((item) => (
              <View key={item.label} style={styles.directoryRow}>
                <Text style={styles.directoryLabel}>{item.label}</Text>
                
                {/* Classic Dotted Dot Leader */}
                <View style={styles.directoryLeader} />
                
                {item.link ? (
                  <Pressable onPress={() => Linking.openURL(item.link)}>
                    <Text selectable style={[styles.directoryValue, styles.linkText]}>
                      {item.value}
                    </Text>
                  </Pressable>
                ) : (
                  <Text selectable style={styles.directoryValue}>
                    {item.value}
                  </Text>
                )}
              </View>
            ))}
          </View>

          <View style={styles.techStackRow}>
            <Text style={styles.techStackText}>EXP // R3F // REANIMATED // TYPESCRIPT</Text>
          </View>
        </View>

        {isMobile && renderStartButton()}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { 
    borderTopWidth: 1, 
    borderTopColor: C.ink, 
    borderBottomWidth: 1, 
    borderBottomColor: C.ink, 
    paddingVertical: 72, 
    marginVertical: 40,
    backgroundColor: C.paper,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 48,
  },
  layoutMobile: {
    flexDirection: 'column',
    gap: 92,
  },
  leftSide: {
    flex: 1,
    gap: 20,
    maxWidth: 480,
  },
  contactBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: C.ink,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: C.white,
  },
  contactBadgeText: {
    color: C.ink,
    fontSize: 9,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  contactTitle: {
    color: C.ink,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '300',
    fontFamily: 'serif',
  },
  italicSerif: {
    fontStyle: 'italic',
  },
  contactBody: {
    color: C.charcoal,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    textAlign: 'justify',
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: C.ink,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  startBtnText: {
    color: C.white,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  rightSide: {
    flex: 1.1,
    width: '100%',
    gap: 20,
  },
  directoryHeader: {
    color: C.muted,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  directoryContainer: {
    gap: 16,
    width: '100%',
  },
  directoryRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  directoryLabel: {
    color: C.muted,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  directoryLeader: {
    flex: 1,
    marginHorizontal: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: C.line,
    borderStyle: 'dotted',
    marginBottom: 3,
  },
  directoryValue: {
    color: C.ink,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  techStackRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: C.line,
    paddingTop: 16,
    marginTop: 8,
  },
  techStackText: {
    color: C.muted,
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'monospace',
    letterSpacing: 1.5,
  },
});
