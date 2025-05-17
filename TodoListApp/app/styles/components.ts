import { StyleSheet } from 'react-native';
import { colors, commonStyles, layout, shadows, spacing, typography } from './theme';

export const spaceListStyles = StyleSheet.create({
  listContainer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl * 2,
  },
  spaceButton: {
    flex: 1,
    borderRadius: layout.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  backgroundImage: {
    width: '100%',
    height: 180,
  },
  backgroundImageStyle: {
    borderRadius: layout.borderRadius.medium,
  },
  contentOverlay: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.overlay,
    justifyContent: 'space-between',
  },
  defaultBackground: {
    backgroundColor: colors.primaryLight,
    borderRadius: layout.borderRadius.medium,
  },
  spaceText: {
    ...typography.subheader,
    color: colors.textOnDark,
    marginBottom: spacing.sm,
    fontWeight: 'bold',
  },
  progressSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  progressText: {
    ...typography.caption,
    color: colors.textOnDark,
    opacity: 0.9,
  },
  progressBar: {
    marginTop: spacing.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  emptyText: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textLight,
    fontStyle: 'italic',
  },
  emptyAddButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: layout.borderRadius.circle,
    marginTop: spacing.md,
  },
  emptyAddText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: typography.body.fontSize,
  },
});

export const taskListStyles = StyleSheet.create({
  emptyText: {
    ...typography.body,
    textAlign: 'center',
    marginTop: spacing.xl,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  taskCard: {
    ...commonStyles.card,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    ...typography.body,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textLight,
  },
  dueDate: {
    ...typography.small,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginLeft: spacing.sm,
  },
  actionButton: {
    borderRadius: layout.borderRadius.medium,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.xs,
  },
  buttonText: {
    color: colors.textOnDark,
    fontWeight: '600',
  },
});

export const addSpaceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryLight,
  },
  headerText: {
    ...typography.header,
    color: colors.primary,
  },
  closeButton: {
    padding: spacing.sm,
  },
  closeButtonText: {
    fontSize: typography.subheader.fontSize,
    color: colors.textLight,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  contentKeyboardOpen: {
    justifyContent: 'space-between',
  },
  input: {
    ...commonStyles.input,
    marginBottom: spacing.lg,
  },
  imagePickerButton: {
    height: 200,
    backgroundColor: colors.background,
    borderRadius: layout.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLight,
    overflow: 'hidden',
  },
  imagePickerButtonSmall: {
    height: 120,
  },
  imagePickerText: {
    ...typography.body,
    color: colors.textLight,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomButtons: {
    marginTop: spacing.lg,
  },
  bottomButtonsKeyboardOpen: {
    marginTop: spacing.sm,
  },
  actionButton: {
    ...commonStyles.button.primary,
  },
  actionText: {
    ...commonStyles.button.text,
  },
});

export const addTaskStyles = StyleSheet.create({
  container: {
    ...commonStyles.card,
    marginBottom: spacing.lg,
  },
  input: {
    ...commonStyles.input,
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xs,
    borderRadius: layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: colors.textLight,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  prioritySelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondaryDark,
  },
  priorityText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '500',
  },
  prioritySelectedText: {
    color: colors.textOnDark,
    fontWeight: '700',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  dueDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.xs,
  },
  dueDateButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: layout.borderRadius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dueDateButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
  },
  dateButton: {
    flex: 1,
    marginRight: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.small,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLight,
    ...shadows.small,
  },
  timeButton: {
    flex: 1,
    marginLeft: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.small,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLight,
    ...shadows.small,
  },
  dateButtonSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondaryDark,
  },
  timeButtonSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondaryDark,
  },
  dateButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  timeButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  dateTimeButtonTextSelected: {
    color: colors.textOnDark,
  },
  recurrenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  recurrenceButton: {
    width: '48%',
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
    borderRadius: layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: colors.textLight,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  recurrenceSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondaryDark,
  },
  recurrenceText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '500',
  },
  recurrenceSelectedText: {
    color: colors.textOnDark,
    fontWeight: '700',
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingVertical: spacing.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
    borderRadius: layout.borderRadius.medium,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  actionText: {
    color: colors.textOnDark,
    fontWeight: '700',
    fontSize: typography.body.fontSize,
  },
});

export const spaceScreenStyles = StyleSheet.create({
  container: {
    ...commonStyles.screen,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerText: {
    ...typography.header,
    color: colors.primary,
  },
  settingsButton: {
    padding: spacing.sm,
  },
  settingsIcon: {
    fontSize: typography.subheader.fontSize,
  },
  content: {
    flex: 1,
  },
  bottomButton: {
    marginTop: spacing.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: layout.borderRadius.large,
    padding: spacing.lg,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    ...typography.title,
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  modalButton: {
    width: '100%',
    padding: spacing.md,
    borderRadius: layout.borderRadius.small,
    backgroundColor: colors.primaryLight,
    marginBottom: spacing.sm,
  },
  modalButtonText: {
    color: colors.text,
    textAlign: 'center',
    fontSize: typography.body.fontSize,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  deleteText: {
    color: colors.textOnDark,
  },
  cancelButton: {
    backgroundColor: colors.background,
  },
});

export const landingScreenStyles = StyleSheet.create({
  container: {
    ...commonStyles.screen,
  },
  title: {
    ...typography.header,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  fabText: {
    fontSize: typography.subheader.fontSize,
    color: colors.textOnDark,
    marginTop: -2,
  },
});

export const progressBarStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  percentageText: {
    ...typography.small,
    color: colors.textLight,
    marginBottom: spacing.xs,
    textAlign: 'right',
  },
  progressContainer: {
    width: '100%',
    borderRadius: layout.borderRadius.small,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
}); 