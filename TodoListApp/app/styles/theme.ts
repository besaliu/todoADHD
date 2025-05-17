import { Platform } from 'react-native';

export const colors = {
  // Primary colors
  primary: '#FF8DC7', // Soft pink
  primaryDark: '#FF69B4', // Darker pink
  primaryLight: '#FFC4E1', // Light pink
  
  // Secondary colors
  secondary: '#B8B8FF', // Soft purple
  secondaryDark: '#9381FF', // Darker purple
  secondaryLight: '#F1F1FF', // Light purple
  
  // Background colors
  background: '#FDFBFF',
  cardBackground: '#FFF0F6',
  overlay: 'rgba(0, 0, 0, 0.3)',
  lightOverlay: 'rgba(0, 0, 0, 0.1)',
  
  // Text colors
  text: '#333333',
  textLight: '#666666',
  textDark: '#000000',
  textOnDark: '#FFFFFF',
  
  // Status colors
  success: '#9EE493', // Soft green
  error: '#FF9999', // Soft red
  warning: '#FFD699', // Soft orange
  
  // Priority colors
  priorityHigh: '#FF9999', // Soft red
  priorityMedium: '#FFD699', // Soft orange
  priorityLow: '#9EE493', // Soft green
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const typography = {
  header: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.text,
  },
  subheader: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: colors.text,
  },
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontSize: 14,
    color: colors.textLight,
  },
  small: {
    fontSize: 12,
    color: colors.textLight,
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
};

export const layout = {
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    circle: 999,
  },
  padding: {
    screen: 20,
    card: 16,
  },
};

export const commonStyles = {
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: layout.borderRadius.large,
    padding: layout.padding.card,
    ...shadows.small,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.md,
    fontSize: typography.body.fontSize,
    color: colors.text,
  },
  button: {
    primary: {
      backgroundColor: colors.primary,
      borderRadius: layout.borderRadius.medium,
      padding: spacing.md,
      alignItems: 'center' as const,
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderRadius: layout.borderRadius.medium,
      padding: spacing.md,
      alignItems: 'center' as const,
    },
    text: {
      color: colors.textOnDark,
      fontSize: typography.body.fontSize,
      fontWeight: '600' as const,
    },
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: layout.padding.screen,
    paddingTop: Platform.OS === 'ios' ? spacing.xl : spacing.xxl,
  },
}; 