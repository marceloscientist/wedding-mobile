import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { weddingColors } from '../../theme/colors';
import { Button } from '../common/Button';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDangerous?: boolean;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  isDangerous = false,
}: ConfirmDialogProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <Button
              title={cancelText}
              onPress={onCancel}
              variant="ghost"
              size="md"
              style={styles.cancelButton}
            />
            <Button
              title={confirmText}
              onPress={onConfirm}
              variant={isDangerous ? 'danger' : 'primary'}
              size="md"
              style={styles.confirmButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: weddingColors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    backgroundColor: weddingColors.surfaceLight,
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 360,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: weddingColors.textPrimary,
    marginBottom: 12,
  },

  message: {
    fontSize: 14,
    fontWeight: '400',
    color: weddingColors.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
  },

  cancelButton: {
    flex: 1,
  },

  confirmButton: {
    flex: 1,
  },
});
