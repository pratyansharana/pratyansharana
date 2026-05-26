import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowUpRight, Code2, Mail, MapPin, Send, Sparkles } from 'lucide-react-native';

import { C } from '../../constants/portfolioTheme';

export function ContactSection() {
  return (
    <View style={[styles.section, styles.contactSection]}>
      <View style={styles.contactPanel}>
        <View style={styles.contactIntro}>
          <View style={styles.contactBadge}>
            <Sparkles size={16} color={C.ink} strokeWidth={1.5} />
            <Text selectable style={styles.contactBadgeText}>AVAILABLE FOR SELECT BUILDS</Text>
          </View>
          <Text selectable style={styles.contactTitle}>
            Let's build a mobile experience that feels fast, calm, and unmistakably premium.
          </Text>
          <Text selectable style={styles.contactBody}>
            I am open to React Native apps, Expo prototypes, 3D portfolio experiences, and intelligent mobile interfaces.
          </Text>
        </View>
        <View style={styles.contactCards}>
          {[
            { icon: Mail, label: 'Email', value: 'pratyansha@email.com' },
            { icon: MapPin, label: 'Location', value: 'India / Remote' },
            { icon: Code2, label: 'GitHub', value: 'Engineering portfolio' },
            { icon: ArrowUpRight, label: 'LinkedIn', value: 'Product network' },
          ].map(({ icon: Icon, label, value }) => (
            <View key={label} style={styles.contactCard}>
              <View style={styles.contactIcon}>
                <Icon size={19} color={C.ink} strokeWidth={1.45} />
              </View>
              <View style={styles.contactCardText}>
                <Text selectable style={styles.contactLabel}>{label}</Text>
                <Text selectable style={styles.contactValue}>{value}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.contactFooter}>
          <Pressable style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Start a project</Text>
            <Send size={16} color={C.white} strokeWidth={1.5} />
          </Pressable>
          <View style={styles.contactMiniMetric}>
            <Code2 size={17} color={C.ink} strokeWidth={1.5} />
            <Text selectable style={styles.contactMiniText}>Expo, R3F, Reanimated, TypeScript</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: C.ink, paddingTop: 34, paddingBottom: 70 },
  contactSection: { paddingBottom: 20 },
  contactPanel: { backgroundColor: C.white, borderWidth: StyleSheet.hairlineWidth, borderColor: C.line, padding: 28, gap: 28 },
  contactIntro: { gap: 16 },
  contactBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: StyleSheet.hairlineWidth, borderColor: C.line, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: C.paper },
  contactBadgeText: { color: C.ink, fontSize: 11, fontWeight: '900' },
  contactTitle: { maxWidth: 940, color: C.ink, fontSize: 52, lineHeight: 57, fontWeight: '200' },
  contactBody: { maxWidth: 650, color: C.charcoal, fontSize: 17, lineHeight: 27 },
  contactCards: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  contactCard: { minWidth: 220, flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: StyleSheet.hairlineWidth, borderColor: C.line, backgroundColor: C.paper, padding: 16 },
  contactIcon: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: C.white, borderWidth: StyleSheet.hairlineWidth, borderColor: C.line },
  contactCardText: { flex: 1, gap: 4 },
  contactLabel: { color: C.muted, fontSize: 11, fontWeight: '900' },
  contactValue: { color: C.ink, fontSize: 16, fontWeight: '800' },
  contactFooter: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12 },
  contactButton: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.ink, paddingHorizontal: 20, paddingVertical: 15 },
  contactButtonText: { color: C.white, fontSize: 14, fontWeight: '800' },
  contactMiniMetric: { flexDirection: 'row', alignItems: 'center', gap: 9, borderWidth: StyleSheet.hairlineWidth, borderColor: C.line, paddingHorizontal: 14, paddingVertical: 14 },
  contactMiniText: { color: C.ink, fontSize: 13, fontWeight: '800' },
});
