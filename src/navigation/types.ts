import type { NavigatorScreenParams } from '@react-navigation/native';
import type { ProjectId } from '../data/projects';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  ProjectDetails: {
    projectId: ProjectId;
  };
};

export type TabParamList = {
  Home: undefined;
  Showcase: undefined;
  Terminal: undefined;
};
