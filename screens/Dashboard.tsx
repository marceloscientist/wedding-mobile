import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles, { colors } from '../styles';
import { EventAPI } from '../services';
import { formatDateToBR } from '../utils/dateFormatter';
import { logger } from '../utils/logger';

const logo = require('../assets/logo.png');

const FEATURES = [
  { id: 'f_events', title: 'Eventos', screen: 'EventosLista', icon: '🎉' },
  { id: 'f_gifts', title: 'Presentes', screen: 'ListaPresentes', icon: '🎁' },
  { id: 'f_sponsors', title: 'Padrinhos', screen: 'PadrinhosLista', icon: '🤝' },
];

export default function Dashboard({ navigation }: any) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await EventAPI.list();
      logger.info('Dashboard', `Loaded ${list.length} upcoming events`);
      setEvents(list);
    } catch (e) {
      logger.error('Dashboard', 'Error loading events', e as Error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useFocusEffect(
    useCallback(() => {
      logger.info('Dashboard', 'Screen focused - refreshing events');
      load();
    }, [load])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={{ alignItems: 'center', marginBottom: 18 }}>
        <Image source={logo} style={{ width: 88, height: 88 }} resizeMode="contain" />
        <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>Casaki</Text>
        <Text style={{ color: colors.muted, marginTop: 4, textAlign: 'center' }}>Gerencie seus eventos, padrinhos e lista de presentes</Text>
      </View>

      <Text style={styles.sectionTitle}>Funcionalidades</Text>
      <View style={{ marginBottom: 12 }}>
        {FEATURES.map((f) => (
          <TouchableOpacity key={f.id} style={styles.card} onPress={() => {
            logger.debug('Dashboard', `Navigate to ${f.screen}`);
            navigation.navigate(f.screen);
          }}>
            <View style={styles.cardIconRow}>
              <View style={[styles.cardIcon, { backgroundColor: '#EEF2FF' }]}>
                <Text style={styles.cardIconText}>{f.icon}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cardTitle}>{f.title}</Text>
              </View>
              <Text style={{ color: colors.muted }}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Próximos Eventos</Text>
      {loading ? (
        <ActivityIndicator />
      ) : events.length === 0 ? (
        <View style={{ alignItems: 'center', paddingVertical: 32 }}>
          <Text style={{ color: '#999' }}>Nenhum evento cadastrado</Text>
        </View>
      ) : (
        events.map((e) => (
          <TouchableOpacity key={e.id} style={styles.card} onPress={() => {
            logger.debug('Dashboard', `Navigate to EventoDetail: ${e.id}`);
            navigation.navigate('EventoDetail', { id: e.id });
          }}>
            <View style={styles.cardIconRow}>
              <View style={[styles.cardIcon, { backgroundColor: '#EFEBFF' }]}>
                <Text style={styles.cardIconText}>📅</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cardTitle}>{e.title}</Text>
                <Text style={styles.cardMeta}>{formatDateToBR(e.date)} • {e.location || 'Local não especificado'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}

    </ScrollView>
  );
}
