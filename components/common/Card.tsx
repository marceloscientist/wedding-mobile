import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, Pressable } from 'react-native';
import { weddingColors } from '../../theme/colors';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  onPress?: () => void;
}

export function Card({ children, style, elevated = true, onPress }: CardProps) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          elevated && styles.elevated,
          style,
          pressed && { opacity: 0.7 }
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View 
      style={[styles.container, elevated && styles.elevated, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: weddingColors.surfaceLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0EDF7',
  },

  elevated: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
});
