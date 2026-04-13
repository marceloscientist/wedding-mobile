import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Card, Button, Header, SectionHeader } from '../components';
import { EventAPI } from '../services';
import { formatDateToBR } from '../utils/dateFormatter';
import { logger } from '../utils/logger';
import styles from '../styles';
import { weddingColors } from '../theme/colors';

type Props = NativeStackScreenProps<any, 'EventosLista'>;

export default function EventosLista({ navigation }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  logger.debug('EventosLista', 'Screen rendered', { itemCount: data.length });

  const load = useCallback(async () => {
    try {
      logger.info('EventosLista', 'Loading events...');
      setLoading(true);
      const list = await EventAPI.list();
      logger.info('EventosLista', `Loaded ${list.length} events`);
      setData(list);
    } catch (e) {
      logger.error('EventosLista', 'Error loading events', e as Error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    logger.debug('EventosLista', 'Initial load on mount');
    load();
  }, [load]);

  // Auto-refresh when screen is focused (after creating/updating)
  useFocusEffect(
    useCallback(() => {
      logger.info('EventosLista', 'Screen focused - refreshing list');
      load();
    }, [load])
  );

  const onRefresh = async () => {
    logger.debug('EventosLista', 'Manual refresh triggered');
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }}>
        <Header />
        <View style={{ alignItems: 'center', paddingVertical: 32 }}>
          <ActivityIndicator />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={{ padding: 16 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Header />

      <View style={{ marginBottom: 24 }}>
        <SectionHeader
          title="Eventos"
          onAddPress={() => {
            logger.debug('EventosLista', 'Navigate to CadastroEventos');
            navigation.navigate('CadastroEventos');
          }}
        />
      </View>

      {data.length === 0 ? (
        <View style={{ alignItems: 'center', paddingVertical: 32 }}>
          <Text style={{ color: weddingColors.textMuted, marginBottom: 16, fontSize: 16 }}>
            Nenhum evento cadastrado
          </Text>
          <Button
            variant="primary"
            size="md"
            label="Criar Evento"
            onPress={() => navigation.navigate('CadastroEventos')}
          />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Card
              key={item.id}
              onPress={() => {
                logger.debug('EventosLista', `Navigate to EventoDetail: ${item.id}`);
                navigation.navigate('EventoDetail', { id: item.id });
              }}
              style={{ marginBottom: 12, cursor: 'pointer' }}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardMeta}>
                {formatDateToBR(item.date)} • {item.location || 'Local não especificado'}
              </Text>
              <Text style={{ marginTop: 6, fontSize: 12, color: weddingColors.mutedText }}>
                {item.guests ?? 0} convidados
              </Text>
            </Card>
          )}
        />
      )}
    </ScrollView>
  );
}
