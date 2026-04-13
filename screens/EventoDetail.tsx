import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { EventAPI } from '../services';
import styles from '../styles';
import { formatDateToBR } from '../utils/dateFormatter';
import { logger } from '../utils/logger';
import { Header, Card, Button, ConfirmDialog } from '../components';

export default function EventoDetail({ route, navigation }: any) {
  const { id } = route.params ?? {};
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) {
        logger.warn('EventoDetail', 'No event id provided');
        setEvent(null);
        setLoading(false);
        return;
      }
      logger.debug('EventoDetail', `Loading event id=${id}`);
      try {
        const e = await EventAPI.get(id);
        if (mounted) {
          setEvent(e);
          logger.info('EventoDetail', `Event loaded: ${e?.title || 'unknown'}`);
        }
      } catch (e) {
        logger.error('EventoDetail', 'Error loading event', e as Error);
        if (mounted) setEvent(null);
      }
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleDelete = async () => {
    logger.debug('EventoDetail', `Delete confirmation for event id=${id}`);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirm(false);
    setLoading(true);
    logger.info('EventoDetail', `Attempting to delete event id=${id}`);
    try {
      const ok = await EventAPI.delete(id);
      if (ok) {
        logger.info('EventoDetail', `Event deleted successfully: id=${id}`);
        setLoading(false);
        setTimeout(() => {
          navigation.navigate('EventosLista');
        }, 300);
      } else {
        logger.warn('EventoDetail', `Failed to delete event: id=${id}`);
        setLoading(false);
      }
    } catch (error) {
      logger.error('EventoDetail', 'Error deleting event', error as Error);
      setLoading(false);
    }
  };

  if (loading) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>;

  if (!event) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#999' }}>Evento não encontrado</Text>
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
        title="Remover Evento"
        message="Deseja realmente remover este evento? Esta ação não pode ser desfeita."
        confirmText="Remover"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        isDangerous
      />

      <View style={{ padding: 16 }}>
        <Card>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <Text style={styles.cardMeta}>
            📅 {formatDateToBR(event.date)} • 📍 {event.location || 'Local não especificado'}
          </Text>

          {event.guests !== undefined && (
            <Text style={{ marginTop: 12, fontSize: 14, color: styles.colors?.textSecondary || '#6B7280' }}>
              👥 {event.guests} convidados
            </Text>
          )}

          {event.description && (
            <Text style={{ marginTop: 16, lineHeight: 22, color: styles.colors?.textPrimary || '#222', fontSize: 14 }}>
              {event.description}
            </Text>
          )}

          <View style={{ height: 20 }} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              title="Editar"
              onPress={() => navigation.navigate('CadastroEventos', { item: event })}
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
