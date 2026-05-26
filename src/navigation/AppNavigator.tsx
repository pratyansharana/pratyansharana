import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import { THEME } from '../constants/theme';
import { RootStackParamList } from './types';
import { ENGINEERING_PROJECTS } from '../data/projects';

// Placeholder screen imports for structure
const ShowcaseScreen = () => <View style={styles.placeholder}><Text style={styles.text}>Showcase Module</Text></View>;
const TerminalScreen = () => <View style={styles.placeholder}><Text style={styles.text}>Terminal Console</Text></View>;
const ProjectDetailsScreen = ({ route }: { route: { params: RootStackParamList['ProjectDetails'] } }) => {
  const project = ENGINEERING_PROJECTS.find((item) => item.id === route.params.projectId);

  return (
    <View style={styles.placeholder}>
      <Text style={styles.text}>{project?.title ?? 'Architecture Details'}</Text>
      <Text style={styles.detailText}>{project?.coreMetric}</Text>
    </View>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  return <HomeScreen />;
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="RootStack"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: THEME.colors.background },
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.lg,
  },
  text: {
    color: THEME.colors.textPrimary,
    fontWeight: '300',
    fontSize: 34,
    textAlign: 'center',
  },
  detailText: {
    marginTop: THEME.spacing.md,
    color: THEME.colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
});
