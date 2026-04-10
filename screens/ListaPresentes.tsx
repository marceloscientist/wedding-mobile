import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Button, Alert } from 'react-native';
import styles from '../styles';
import { PresentAPI } from '../services';

export default function ListaPresentes() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await PresentAPI.list();
      if (mounted) setData(list);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const handleReserve = async (id: string) => {
    const ok = await PresentAPI.reserve(id, 'Usuário');
    if (ok) {
      Alert.alert('Reservado', 'Presente reservado com sucesso');
      const list = await PresentAPI.list();
      setData(list);
    } else {
      Alert.alert('Já reservado', 'Este presente já foi reservado');
    }
  };

  if (loading) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>;

  return (
    <View style={styles.page}>
      <View style={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Lista de Presentes</Text>

        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardMeta}>{item.reservedBy ? `Reservado por ${item.reservedBy}` : 'Disponível'}</Text>
              {!item.reservedBy && <View style={{ height: 8 }}><Button title="Reservar" onPress={() => handleReserve(item.id)} /></View>}
            </View>
          )}
        />
      </View>
    </View>
  );
}
