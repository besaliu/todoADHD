import React from 'react';
import { Text, View } from 'react-native';
import { progressBarStyles as styles } from '../styles/components';

type ProgressBarProps = {
  percentage: number;
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  showPercentage?: boolean;
  style?: object;
};

const ProgressBar = ({
  percentage,
  height = 10,
  backgroundColor = '#E2E2E2',
  fillColor = '#5a189a',
  showPercentage = true,
  style = {},
}: ProgressBarProps) => {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <View style={[styles.container, style]}>
      {showPercentage && (
        <Text style={styles.percentageText}>{validPercentage}% Complete</Text>
      )}
      <View style={[styles.progressContainer, { height, backgroundColor }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${validPercentage}%`,
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ProgressBar;