import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import styles, { colors } from '../styles';
import { EventAPI } from '../services';

const logo = require('../assets/logo.png');

const FEATURES = [
  { id: 'f_events', title: 'Eventos', screen: 'EventosLista', icon: '🎉' },
  { id: 'f_gifts', title: 'Presentes', screen: 'ListaPresentes', icon: '🎁' },
  { id: 'f_sponsors', title: 'Padrinhos', screen: 'PadrinhosLista', icon: '🤝' },
  { id: 'f_new', title: 'Novo evento', screen: 'CadastroEventos', icon: '＋' },
  { id: 'f_profile', title: 'Perfil', screen: 'Dashboard', icon: '👤' },
  { id: 'f_settings', title: 'Ajustes', screen: 'Dashboard', icon: '⚙️' },
];

export default function Dashboard({ navigation }: any) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await EventAPI.list();
      setEvents(list);
    } catch (e) {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const formatDate = (iso: string) => {
    try { return new Date(iso).toLocaleDateString('pt-BR'); } catch { return iso; }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={{ alignItems: 'center', marginBottom: 18 }}>
        <Image source={logo} style={{ width: 88, height: 88 }} resizeMode="contain" />
        <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>Casaki</Text>
        <Text style={{ color: colors.muted, marginTop: 4 }}>Gerencie seus eventos e lista de presentes</Text>
      </View>

      <Text style={styles.sectionTitle}>Recursos</Text>
      <View style={{ marginBottom: 12 }}>
        {FEATURES.map((f) => (
          <TouchableOpacity key={f.id} style={styles.card} onPress={() => navigation.navigate(f.screen)}>
            <View style={styles.cardIconRow}>
              <View style={[styles.cardIcon, { backgroundColor: '#EEF2FF' }]}>
                <Text style={styles.cardIconText}>{f.icon}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.cardTitle}>{f.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Próximos eventos</Text>
      {loading ? <ActivityIndicator /> : events.map((e) => (
        <TouchableOpacity key={e.id} style={styles.card} onPress={() => navigation.navigate('EventoDetail', { id: e.id })}>
          <View style={styles.cardIconRow}>
            <View style={[styles.cardIcon, { backgroundColor: '#EFEBFF' }]}>
              <Text style={styles.cardIconText}>📅</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>{e.title}</Text>
              <Text style={styles.cardMeta}>{formatDate(e.date)} • {e.location}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}
