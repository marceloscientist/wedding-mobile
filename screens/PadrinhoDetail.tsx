import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert } from 'react-native';
import styles from '../styles';
import { PadrinhoAPI } from '../services';

export default function PadrinhoDetail({ route, navigation }: any) {
  const { id } = route.params ?? {};
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const p = await PadrinhoAPI.get(id);
      if (mounted) setItem(p);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleDelete = async () => {
    const ok = await PadrinhoAPI.delete(id);
    if (ok) {
      Alert.alert('Removido', 'Padrinho removido');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Não foi possível remover');
    }
  };

  if (loading) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>;
  if (!item) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Padrinho não encontrado</Text></View>;

  return (
    <View style={styles.page}>
      <View style={{ padding: 16 }}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardMeta}>{item.phone}</Text>
          <View style={{ height: 12 }} />
          <Button title="Remover padrinho" color="#cc3333" onPress={handleDelete} />
        </View>
      </View>
    </View>
  );
}
