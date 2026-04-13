import React from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import styles from '../styles';
import { usePadrinhoForm } from '../hooks/usePadrinhoForm';
import { logger } from '../utils/logger';
import { Header, Card, Button, FormField } from '../components';

export default function CadastroPadrinhos({ navigation, route }: any) {
  const editingData = route?.params?.item;
  const { payload, setField, submit, errors, submitting } = usePadrinhoForm(editingData);

  const handleSave = async () => {
    logger.debug('CadastroPadrinhos', 'Submit form', { name: payload.name, phone: payload.phone });
    const res = await submit();
    if (res.ok && ((res as any).created || (res as any).updated)) {
      const padrinhoData = (res as any).created || (res as any).updated;
      const message = editingData ? 'Padrinho atualizado com sucesso' : 'Padrinho criado com sucesso';
      logger.info('CadastroPadrinhos', message, { id: padrinhoData.id, name: padrinhoData.name });
      Alert.alert('Sucesso', message);
      navigation.navigate('PadrinhoDetail', { id: padrinhoData.id });
    } else if (res.errors) {
      logger.warn('CadastroPadrinhos', 'Validation errors', res.errors);
      const errorMessages = Object.entries(res.errors)
        .map(([key, msg]) => `${key}: ${msg}`)
        .join('\n');
      Alert.alert('Erro de Validação', errorMessages);
    } else {
      logger.error('CadastroPadrinhos', 'Failed to save padrinho');
      Alert.alert('Erro', 'Falha ao salvar padrinho');
    }
  };

  return (
    <ScrollView style={styles.page}>
      <Header
        onBack={() => navigation.navigate('PadrinhosLista')}
        showDashboard={false}
      />

      <View style={{ padding: 16 }}>
        <Card>
          <Text style={styles.sectionTitle}>{editingData ? 'Editar Padrinho' : 'Novo Padrinho'}</Text>

          <FormField
            label="Nome"
            value={payload.name || ''}
            onChangeText={(t: string) => {
              logger.debug('CadastroPadrinhos', `Name changed: ${t}`);
              setField('name', t);
            }}
            placeholder="Ex: Carlos Silva"
            error={errors.name}
            required
          />

          <FormField
            label="Telefone"
            value={payload.phone || ''}
            onChangeText={(t: string) => {
              logger.debug('CadastroPadrinhos', `Phone changed: ${t}`);
              setField('phone', t);
            }}
            placeholder="Ex: (11) 99999-0001"
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <FormField
            label="Email"
            value={payload.email || ''}
            onChangeText={(t: string) => {
              logger.debug('CadastroPadrinhos', `Email changed: ${t}`);
              setField('email', t);
            }}
            placeholder="Ex: carlos@email.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <View style={{ height: 24 }} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              title="Cancelar"
              onPress={() => {
                logger.debug('CadastroPadrinhos', 'Cancelled, navigating to PadrinhosLista');
                navigation.navigate('PadrinhosLista');
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
