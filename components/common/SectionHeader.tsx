import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { weddingColors } from '../../theme/colors';

interface SectionHeaderProps {
  title: string;
  onAddPress: () => void;
  addButtonText?: string;
}

export function SectionHeader({
  title,
  onAddPress,
  addButtonText = '+ Novo',
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddPress}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>{addButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: weddingColors.textPrimary,
  },

  addButton: {
    backgroundColor: weddingColors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  addButtonText: {
    color: weddingColors.textInverted,
    fontWeight: '600',
    fontSize: 13,
  },
});
