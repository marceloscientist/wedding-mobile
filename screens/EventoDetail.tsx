import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert, ScrollView } from 'react-native';
import { EventAPI } from '../services';
import styles from '../styles';

export default function EventoDetail({ route, navigation }: any) {
  const { id } = route.params ?? {};
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) {
        setEvent(null);
        setLoading(false);
        return;
      }
      const e = await EventAPI.get(id);
      if (mounted) setEvent(e);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleDelete = async () => {
    const ok = await EventAPI.delete(id);
    if (ok) {
      Alert.alert('Removido', 'Evento removido com sucesso');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Não foi possível remover');
    }
  };

  if (loading) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>;

  if (!event) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Evento não encontrado</Text></View>;

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.card}>
  <Text style={styles.cardTitle}>{event.title}</Text>
  <Text style={styles.cardMeta}>{new Date(event.date).toLocaleDateString('pt-BR')} • {event.location}</Text>
        <Text style={{ marginTop: 12 }}>{event.description}</Text>
        <View style={{ height: 12 }} />
        <Button title="Apagar evento" color="#cc3333" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}
