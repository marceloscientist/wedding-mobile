import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Header, Card, Button, ConfirmDialog, PurchaseModal, SectionHeader } from '../components';
import { PresentAPI, PadrinhoAPI } from '../services/api';
import { weddingColors } from '../theme/colors';
import styles from '../styles';

type Props = NativeStackScreenProps<any, 'ListaPresentes'>;

export default function ListaPresentes({ navigation }: Props) {
  const [presentes, setPresentes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [padrinhos, setPadrinhos] = useState<any[]>([]);

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    visible: boolean;
    presenteId?: string;
  }>({ visible: false });

  // Purchase modal state
  const [purchaseModal, setPurchaseModal] = useState<{
    visible: boolean;
    presenteId?: string;
    presenteTitle?: string;
  }>({ visible: false });

  const loadPresentes = async () => {
    setLoading(true);
    try {
      const [data, padrinhos] = await Promise.all([
        PresentAPI.list(),
        PadrinhoAPI.list(),
      ]);
      setPresentes(data);
      setPadrinhos(padrinhos);
    } catch (e) {
      console.error('Erro ao carregar presentes:', e);
      setPresentes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPresentes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadPresentes();
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPresentes();
    setRefreshing(false);
  };

  const handleDelete = async (presenteId: string) => {
    const success = await PresentAPI.delete(presenteId);
    if (success) {
      setPresentes((prev) => prev.filter((p) => p.id !== presenteId));
      setDeleteConfirm({ visible: false });
    }
  };

  const handlePurchase = async (
    presenteId: string,
    purchaseType: 'self' | 'padrinho',
    selectedPadrinho?: string
  ) => {
    const success = await PresentAPI.markAsPurchased(presenteId, selectedPadrinho || 'Nós', purchaseType);
    if (success) {
      await loadPresentes();
      setPurchaseModal({ visible: false });
    }
  };

  if (loading && presentes.length === 0) {
    return (
      <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }}>
        <Header />
        <View style={{ alignItems: 'center', paddingVertical: 32 }}>
          <Text style={{ color: weddingColors.textMuted }}>Carregando presentes...</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <Header />

      <View style={{ marginBottom: 24 }}>
        <SectionHeader
          title="Presentes"
          onAddPress={() => navigation.navigate('CadastroPresentes')}
        />
      </View>

      {presentes.length === 0 ? (
        <View style={{ alignItems: 'center', paddingVertical: 32 }}>
          <Text style={{ color: weddingColors.textMuted, marginBottom: 16, fontSize: 16 }}>
            Nenhum presente cadastrado
          </Text>
          <Button
            variant="primary"
            size="md"
            label="Criar Presente"
            onPress={() => navigation.navigate('CadastroPresentes')}
          />
        </View>
      ) : (
        <FlatList
          data={presentes}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item: presente }) => (
            <Card key={presente.id} style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{presente.title}</Text>
                  <Text style={styles.cardMeta}>
                    {presente.purchasedBy && presente.purchasedByType
                      ? presente.purchasedByType === 'self'
                        ? '✓ Comprado pelo casal'
                        : `✓ Comprado por ${padrinhos.find(p => p.id === presente.purchasedBy)?.name || presente.purchasedBy}`
                      : '○ Disponível'}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  marginTop: 12,
                  justifyContent: 'flex-end',
                }}
              >
                {!presente.purchasedBy && (
                  <Button
                    variant="secondary"
                    size="sm"
                    label="Marcar como Comprado"
                    onPress={() => setPurchaseModal({ visible: true, presenteId: presente.id, presenteTitle: presente.title })}
                  />
                )}
                <Button
                  variant="danger"
                  size="sm"
                  label="Remover"
                  onPress={() => setDeleteConfirm({ visible: true, presenteId: presente.id })}
                />
              </View>
            </Card>
          )}
        />
      )}

      {/* Purchase Modal */}
      <PurchaseModal
        visible={purchaseModal.visible}
        presenteTitle={purchaseModal.presenteTitle || ''}
        onClose={() => setPurchaseModal({ visible: false })}
        onConfirm={(purchaseType: 'self' | 'padrinho', selectedPadrinho?: any) => {
          if (purchaseModal.presenteId) {
            handlePurchase(purchaseModal.presenteId, purchaseType, selectedPadrinho?.id);
          }
        }}
        padrinhos={padrinhos}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        visible={deleteConfirm.visible}
        title="Remover Presente"
        message="Deseja realmente remover este presente?"
        isDangerous={true}
        confirmText="Remover"
        onConfirm={() => {
          if (deleteConfirm.presenteId) {
            handleDelete(deleteConfirm.presenteId);
          }
        }}
        onCancel={() => setDeleteConfirm({ visible: false })}
      />
    </ScrollView>
  );
}
