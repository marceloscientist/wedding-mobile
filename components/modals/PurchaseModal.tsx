import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { weddingColors } from '../../theme/colors';
import { Button } from '../common/Button';

interface PurchaseModalProps {
  visible: boolean;
  presenteTitle?: string;
  padrinhos: any[];
  onConfirm: (type: 'self' | 'padrinho', padrinho?: any) => void;
  onClose?: () => void;
  onCancel?: () => void;
}

export function PurchaseModal({
  visible,
  presenteTitle = '',
  padrinhos,
  onConfirm,
  onClose,
  onCancel,
}: PurchaseModalProps) {
  const [purchaseType, setPurchaseType] = useState<'self' | 'padrinho'>('self');
  const [selectedPadrinho, setSelectedPadrinho] = useState<any | null>(null);

  const handleConfirm = () => {
    if (purchaseType === 'self') {
      onConfirm('self');
    } else if (selectedPadrinho) {
      onConfirm('padrinho', selectedPadrinho);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Marcar como Comprado</Text>
          <Text style={styles.subtitle}>Presente: {presenteTitle}</Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.option,
                purchaseType === 'self' && styles.optionSelected,
              ]}
              onPress={() => {
                setPurchaseType('self');
                setSelectedPadrinho(null);
              }}
            >
              <View
                style={[
                  styles.radio,
                  purchaseType === 'self' && styles.radioSelected,
                ]}
              />
              <Text style={styles.optionText}>Nós compramos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                purchaseType === 'padrinho' && styles.optionSelected,
              ]}
              onPress={() => setPurchaseType('padrinho')}
            >
              <View
                style={[
                  styles.radio,
                  purchaseType === 'padrinho' && styles.radioSelected,
                ]}
              />
              <Text style={styles.optionText}>Um padrinho comprou</Text>
            </TouchableOpacity>
          </View>

          {purchaseType === 'padrinho' && (
            <View style={styles.padrinhoList}>
              <Text style={styles.padrinhoLabel}>Selecione o padrinho:</Text>
              <FlatList
                data={padrinhos}
                keyExtractor={(p) => p.id}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                style={styles.list}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.padrinhoItem,
                      selectedPadrinho?.id === item.id &&
                        styles.padrinhoItemSelected,
                    ]}
                    onPress={() => setSelectedPadrinho(item)}
                  >
                    <Text
                      style={[
                        styles.padrinhoName,
                        selectedPadrinho?.id === item.id &&
                          styles.padrinhoNameSelected,
                      ]}
                    >
                      {item.name}
                    </Text>
                    {item.phone && (
                      <Text style={styles.padrinhoPhone}>{item.phone}</Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View style={styles.actions}>
            <Button
              title="Cancelar"
              onPress={handleCancel}
              variant="ghost"
              size="md"
              style={styles.cancelButton}
            />
            <Button
              title="Confirmar"
              onPress={handleConfirm}
              variant="primary"
              size="md"
              disabled={purchaseType === 'padrinho' && !selectedPadrinho}
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
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
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
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: weddingColors.textSecondary,
    marginBottom: 20,
  },

  optionsContainer: {
    marginBottom: 20,
    gap: 10,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: weddingColors.background,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  optionSelected: {
    backgroundColor: '#EAE7FF',
    borderColor: weddingColors.primary,
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: weddingColors.textMuted,
    marginRight: 12,
  },

  radioSelected: {
    backgroundColor: weddingColors.primary,
    borderColor: weddingColors.primary,
  },

  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: weddingColors.textPrimary,
  },

  padrinhoList: {
    marginBottom: 20,
    maxHeight: 200,
  },

  padrinhoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: weddingColors.textSecondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  list: {
    flexGrow: 0,
  },

  padrinhoItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: weddingColors.background,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },

  padrinhoItemSelected: {
    backgroundColor: '#EAE7FF',
    borderLeftColor: weddingColors.primary,
  },

  padrinhoName: {
    fontSize: 14,
    fontWeight: '600',
    color: weddingColors.textPrimary,
  },

  padrinhoNameSelected: {
    color: weddingColors.primary,
  },

  padrinhoPhone: {
    fontSize: 12,
    fontWeight: '400',
    color: weddingColors.textSecondary,
    marginTop: 2,
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
