import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';
import { PadrinhoAPI } from '../services';

export default function PadrinhosLista({ navigation }: any) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await PadrinhoAPI.list();
      if (mounted) setData(list);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>;

  return (
    <View style={styles.page}>
      <View style={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Padrinhos</Text>

        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PadrinhoDetail', { id: item.id })}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardMeta}>{item.phone}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
