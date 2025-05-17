import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Task } from './types';

// Configure notifications to show alerts when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationsPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF1493',
      sound: 'notification.wav', // Make sure this matches the sound file in app.json
    });
  }

  return true;
}

export async function scheduleTaskNotifications(task: Task) {
  if (!task.notificationsEnabled || !task.dueDate) return;

  const dueDate = new Date(task.dueDate);
  const now = new Date();
  
  // Schedule notifications at different intervals if they're in the future
  const notificationTimes = [
    { minutes: 15, title: "Task Due Soon", message: "is due in 15 minutes" },
    { hours: 1, title: "Task Due Soon", message: "is due in 1 hour" },
    { hours: 24, title: "Task Tomorrow", message: "is due tomorrow" }
  ];

  for (const time of notificationTimes) {
    const notificationTime = new Date(dueDate);
    if (time.minutes) {
      notificationTime.setMinutes(notificationTime.getMinutes() - time.minutes);
    }
    if (time.hours) {
      notificationTime.setHours(notificationTime.getHours() - time.hours);
    }

    if (notificationTime > now) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: time.title,
          body: `${task.title} ${time.message}`,
          data: { taskId: task.id },
          sound: 'notification.wav',
        },
        trigger: { channelId: 'default', date: notificationTime },
      });
    }
  }

  // Always schedule the due time notification if it's in the future
  if (dueDate > now) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⏰ Task Due Now",
        body: `${task.title} is due now`,
        data: { taskId: task.id },
        sound: 'notification.wav',
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: { channelId: 'default', date: dueDate },
    });
  }
}

export async function cancelTaskNotifications(taskId: string) {
  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  const taskNotifications = scheduledNotifications.filter(
    notification => notification.content.data?.taskId === taskId
  );
  
  for (const notification of taskNotifications) {
    await Notifications.cancelScheduledNotificationAsync(notification.identifier);
  }
}

export async function getScheduledNotificationsForTask(taskId: string) {
  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  return scheduledNotifications.filter(
    notification => notification.content.data?.taskId === taskId
  );
}

export function getNextRecurrence(date: Date, pattern: Task['recurrence']): Date | null {
  if (pattern === 'none') return null;

  const next = new Date(date);
  
  switch (pattern) {
    case 'daily':
      next.setDate(next.getDate() + 1);
      break;
    case 'weekly':
      next.setDate(next.getDate() + 7);
      break;
    case 'monthly':
      next.setMonth(next.getMonth() + 1);
      break;
  }
  
  return next;
} 