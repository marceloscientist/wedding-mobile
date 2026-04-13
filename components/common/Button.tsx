import React from 'react';
import { TouchableOpacity, Text, ViewStyle, StyleSheet } from 'react-native';
import { weddingColors } from '../../theme/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title?: string;
  label?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export function Button({
  title,
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  testID,
}: ButtonProps) {
  const buttonText = title || label || 'Button';
  const containerStyle = [
    styles.base,
    styles[`${variant}_bg`],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [styles.text, styles[`${variant}_text`], styles[`text_${size}`]];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      testID={testID}
    >
      <Text style={textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  // Sizes
  size_sm: { paddingVertical: 8, paddingHorizontal: 16 },
  size_md: { paddingVertical: 12, paddingHorizontal: 20 },
  size_lg: { paddingVertical: 16, paddingHorizontal: 24 },

  // Variants - Background
  primary_bg: { backgroundColor: weddingColors.primary },
  secondary_bg: { backgroundColor: weddingColors.secondary },
  danger_bg: { backgroundColor: weddingColors.error },
  ghost_bg: { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 },

  // Variants - Text
  primary_text: { color: weddingColors.textInverted, fontWeight: '600' },
  secondary_text: { color: weddingColors.textInverted, fontWeight: '600' },
  danger_text: { color: weddingColors.textInverted, fontWeight: '600' },
  ghost_text: { color: weddingColors.primary, fontWeight: '600' },

  // Text Sizes
  text_sm: { fontSize: 12 },
  text_md: { fontSize: 14 },
  text_lg: { fontSize: 16 },

  // Disabled
  disabled: {
    opacity: 0.5,
  },

  text: {
    fontWeight: '600',
  },
});
