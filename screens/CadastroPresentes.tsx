import React from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import styles from '../styles';
import { usePresenteForm } from '../hooks/usePresenteForm';
import { logger } from '../utils/logger';
import { Header, Card, Button, FormField } from '../components';

export default function CadastroPresentes({ navigation, route }: any) {
  const editingData = route?.params?.item;
  const { payload, setField, submit, errors, submitting } = usePresenteForm(editingData);

  const handleSave = async () => {
    logger.debug('CadastroPresentes', 'Submit form', { title: payload.title });
    const res = await submit();
    if (res.ok && ((res as any).created || (res as any).updated)) {
      const presenteData = (res as any).created || (res as any).updated;
      const message = editingData ? 'Presente atualizado com sucesso' : 'Presente criado com sucesso';
      logger.info('CadastroPresentes', message, { id: presenteData.id, title: presenteData.title });
      Alert.alert('Sucesso', message);
      navigation.navigate('ListaPresentes');
    } else if (res.errors) {
      logger.warn('CadastroPresentes', 'Validation errors', res.errors);
    } else {
      logger.error('CadastroPresentes', 'Failed to save presente');
      Alert.alert('Erro', 'Falha ao salvar presente');
    }
  };

  return (
    <ScrollView style={styles.page}>
      <Header
        onBack={() => navigation.navigate('ListaPresentes')}
        showDashboard={false}
      />

      <View style={{ padding: 16 }}>
        <Card>
          <Text style={styles.sectionTitle}>{editingData ? 'Editar Presente' : 'Novo Presente'}</Text>

          <FormField
            label="Título do Presente"
            value={payload.title || ''}
            onChangeText={(t: string) => {
              logger.debug('CadastroPresentes', `Title changed: ${t}`);
              setField('title', t);
            }}
            placeholder="Ex: Conjunto de toalhas"
            error={errors.title}
            required
          />

          <View style={{ height: 24 }} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              title="Cancelar"
              onPress={() => {
                logger.debug('CadastroPresentes', 'Cancelled, navigating to ListaPresentes');
                navigation.navigate('ListaPresentes');
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
