import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Card, Button, Header, SectionHeader } from '../components';
import { PadrinhoAPI } from '../services';
import { logger } from '../utils/logger';
import styles from '../styles';
import { weddingColors } from '../theme/colors';

type Props = NativeStackScreenProps<any, 'PadrinhosLista'>;

export default function PadrinhosLista({ navigation }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      logger.info('PadrinhosLista', 'Loading padrinhos...');
      setLoading(true);
      const list = await PadrinhoAPI.list();
      logger.info('PadrinhosLista', `Loaded ${list.length} padrinhos`);
      setData(list);
    } catch (e) {
      logger.error('PadrinhosLista', 'Error loading padrinhos', e as Error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    logger.debug('PadrinhosLista', 'Initial load on mount');
    load();
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      logger.info('PadrinhosLista', 'Screen focused - refreshing list');
      load();
    }, [load])
  );

  const onRefresh = async () => {
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
          title="Padrinhos"
          onAddPress={() => navigation.navigate('CadastroPadrinhos')}
        />
      </View>

      {data.length === 0 ? (
        <View style={{ alignItems: 'center', paddingVertical: 32 }}>
          <Text style={{ color: weddingColors.textMuted, marginBottom: 16, fontSize: 16 }}>
            Nenhum padrinho cadastrado
          </Text>
          <Button
            variant="primary"
            size="md"
            label="Adicionar Padrinho"
            onPress={() => navigation.navigate('CadastroPadrinhos')}
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
                logger.debug('PadrinhosLista', `Navigating to PadrinhoDetail for id=${item.id}, name=${item.name}`);
                navigation.navigate('PadrinhoDetail', { id: item.id });
              }}
              style={{ marginBottom: 12, cursor: 'pointer' }}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardMeta}>{item.phone || 'Sem telefone'}</Text>
              {item.email && (
                <Text style={{ marginTop: 4, fontSize: 12, color: weddingColors.mutedText }}>
                  {item.email}
                </Text>
              )}
            </Card>
          )}
        />
      )}
    </ScrollView>
  );
}
