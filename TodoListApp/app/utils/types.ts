export type RecurrencePattern = 'none' | 'daily' | 'weekly' | 'monthly';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string; // ISO string for date and time
  spaceId: string;
  recurrence: RecurrencePattern;
  notificationsEnabled: boolean;
  nextNotification?: string; // ISO string for next notification time
};

export type Space = {
  id: string;
  name: string;
  imageUri?: string;  // URI of the background image
};

export type RootStackParamList = {
  Landing: undefined;
  Space: undefined;
};