export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  spaceId: string;
}

export interface Space {
  id: string;
  name: string;
}

export type RootStackParamList = {
  Landing: undefined;
  Space: undefined;
};