import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import styles from '../styles';
import { PadrinhoAPI } from '../services';
import { logger } from '../utils/logger';
import { Header, Card, Button, ConfirmDialog } from '../components';

export default function PadrinhoDetail({ route, navigation }: any) {
  const { id } = route.params ?? {};
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) {
        logger.warn('PadrinhoDetail', 'No padrinho id provided');
        setItem(null);
        setLoading(false);
        return;
      }
      logger.debug('PadrinhoDetail', `Loading padrinho id=${id}`);
      try {
        const p = await PadrinhoAPI.get(id);
        if (mounted) {
          setItem(p);
          logger.info('PadrinhoDetail', `Padrinho loaded: ${p?.name || 'unknown'}`);
        }
      } catch (e) {
        logger.error('PadrinhoDetail', 'Error loading padrinho', e as Error);
        if (mounted) setItem(null);
      }
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleDelete = () => {
    logger.debug('PadrinhoDetail', `Delete confirmation for padrinho id=${id}`);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirm(false);
    setLoading(true);
    logger.info('PadrinhoDetail', `Attempting to delete padrinho id=${id}`);
    try {
      const ok = await PadrinhoAPI.delete(id);
      if (ok) {
        logger.info('PadrinhoDetail', `Padrinho deleted successfully: id=${id}`);
        setLoading(false);
        setTimeout(() => {
          navigation.navigate('PadrinhosLista');
        }, 300);
      } else {
        logger.warn('PadrinhoDetail', `Failed to delete padrinho: id=${id}`);
        setLoading(false);
      }
    } catch (error) {
      logger.error('PadrinhoDetail', 'Error deleting padrinho', error as Error);
      setLoading(false);
    }
  };

  if (loading) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>;
  
  if (!item) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#999' }}>Padrinho não encontrado</Text>
    </View>
  );

  return (
    <ScrollView style={styles.page}>
      <Header
        onBack={() => navigation.goBack()}
        onDashboard={() => navigation.navigate('Dashboard')}
      />

      <ConfirmDialog
        visible={showDeleteConfirm}
        title="Remover Padrinho"
        message="Deseja realmente remover este padrinho? Esta ação não pode ser desfeita."
        confirmText="Remover"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        isDangerous
      />

      <View style={{ padding: 16 }}>
        <Card>
          <Text style={styles.cardTitle}>{item.name}</Text>
          {item.phone && (
            <Text style={styles.cardMeta}>📱 {item.phone}</Text>
          )}
          {item.email && (
            <Text style={{ marginTop: 8, fontSize: 13, color: styles.colors?.textSecondary || '#6B7280' }}>
              ✉️ {item.email}
            </Text>
          )}

          <View style={{ height: 20 }} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              title="Editar"
              onPress={() => navigation.navigate('CadastroPadrinhos', { item })}
              variant="secondary"
              size="md"
              style={{ flex: 1 }}
            />
            <Button
              title="Remover"
              onPress={handleDelete}
              variant="danger"
              size="md"
              style={{ flex: 1 }}
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
