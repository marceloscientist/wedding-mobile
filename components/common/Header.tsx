import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { weddingColors } from '../../theme/colors';

interface HeaderProps {
  onBack?: () => void;
  onDashboard?: () => void;
  showDashboard?: boolean;
}

export function Header({ onBack, onDashboard, showDashboard = true }: HeaderProps) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.linkContainer}>
          <Text style={styles.link}>← Voltar</Text>
        </TouchableOpacity>
      )}

      {showDashboard && onDashboard && (
        <TouchableOpacity onPress={onDashboard} style={styles.linkContainer}>
          <Text style={styles.link}>⌂ Dashboard</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: weddingColors.surfaceLight,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDF7',
  },

  linkContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  link: {
    fontSize: 14,
    fontWeight: '600',
    color: weddingColors.textPrimary,
  },
});
