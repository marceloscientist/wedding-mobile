import React, { useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import styles from '../styles';
import { useEventForm } from '../hooks/useEventForm';
import { formatDateToBR } from '../utils/dateFormatter';
import { logger } from '../utils/logger';
import { DatePickerField } from '../utils/DatePickerField';
import { Header, Card, Button, FormField } from '../components';

export default function CadastroEventos({ navigation, route }: any) {
  const editingData = route?.params?.item;
  const { payload, setField, submit, errors, submitting } = useEventForm(editingData);

  logger.debug('CadastroEventos', 'Screen rendered', { payload, isEdit: !!editingData });

  const handleSave = async () => {
    try {
      logger.info('CadastroEventos', 'Attempting to save event', { payload });
      const res = await submit();
      
      if (res.ok && (res.created || res.updated)) {
        const eventData = res.created || res.updated;
        const message = editingData ? 'Evento atualizado com sucesso' : 'Evento criado com sucesso';
        logger.info('CadastroEventos', message, { id: (eventData as any).id, title: (eventData as any).title });
        Alert.alert('Sucesso', message);
        navigation.navigate('EventoDetail', { id: (eventData as any).id });
      } else if (res.errors) {
        logger.warn('CadastroEventos', 'Validation errors', res.errors);
        const errorMessages = Object.entries(res.errors)
          .map(([key, msg]) => `${key}: ${msg}`)
          .join('\n');
        Alert.alert('Erro de Validação', errorMessages);
      } else {
        logger.error('CadastroEventos', 'Unknown error saving event');
        Alert.alert('Erro', 'Falha ao salvar evento');
      }
    } catch (err) {
      logger.error('CadastroEventos', 'Exception during save', err as Error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar');
    }
  };

  return (
    <ScrollView style={styles.page}>
      <Header
        onBack={() => navigation.navigate('EventosLista')}
        showDashboard={false}
      />

      <View style={{ padding: 16 }}>
        <Card>
          <Text style={styles.sectionTitle}>{editingData ? 'Editar Evento' : 'Novo Evento'}</Text>

          <FormField
            label="Título"
            value={payload.title || ''}
            onChangeText={(t) => {
              logger.debug('CadastroEventos', `Title changed: ${t}`);
              setField('title', t);
            }}
            placeholder="Ex: Casamento: Ana & João"
            error={errors.title}
            required
          />

          <DatePickerField
            value={payload.date || ''}
            onChange={(date) => {
              logger.info('CadastroEventos', `Date changed: ${date} (display: ${formatDateToBR(date)})`);
              setField('date', date);
            }}
            label="Data"
            required
            error={errors.date}
          />

          <FormField
            label="Local"
            value={payload.location || ''}
            onChangeText={(t) => {
              logger.debug('CadastroEventos', `Location changed: ${t}`);
              setField('location', t);
            }}
            placeholder="Ex: Igreja Matriz"
            error={errors.location}
          />

          <FormField
            label="Descrição"
            value={payload.description || ''}
            onChangeText={(t) => {
              logger.debug('CadastroEventos', `Description changed: ${t.substring(0, 50)}...`);
              setField('description', t);
            }}
            placeholder="Detalhes do evento..."
            multiline
          />

          <FormField
            label="Convidados"
            value={String(payload.guests || 0)}
            onChangeText={(t) => {
              const num = parseInt(t, 10);
              if (!isNaN(num)) {
                logger.debug('CadastroEventos', `Guests changed: ${num}`);
                setField('guests', num);
              }
            }}
            placeholder="Ex: 100"
            keyboardType="number-pad"
            error={errors.guests as string | undefined}
          />

          <View style={{ height: 24 }} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              title="Cancelar"
              onPress={() => {
                logger.debug('CadastroEventos', 'Cancelled, navigating to EventosLista');
                navigation.navigate('EventosLista');
              }}
              variant="ghost"
              size="md"
              style={{ flex: 1 }}
            />
            <Button
              title={submitting ? 'Salvando...' : 'Salvar'}
              onPress={handleSave}
              disabled={submitting}
              variant="primary"
              size="md"
              style={{ flex: 1 }}
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
