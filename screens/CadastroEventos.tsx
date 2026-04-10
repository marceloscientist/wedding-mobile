import React from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import styles from '../styles';
import { useEventForm } from '../hooks/useEventForm';

export default function CadastroEventos({ navigation }: any) {
  const { payload, setField, submit, errors, submitting } = useEventForm();

  const handleSave = async () => {
    const res = await submit();
    if (res.ok && res.created) {
      Alert.alert('Criado', 'Evento criado com sucesso');
      navigation.navigate('EventoDetail', { id: res.created.id });
    } else if (res.errors) {
      // errors are shown inline
    } else {
      Alert.alert('Erro', 'Falha ao criar evento');
    }
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Novo Evento</Text>

        <Text style={{ marginTop: 8 }}>Título</Text>
        <TextInput value={payload.title} onChangeText={(t) => setField('title', t)} placeholder="Ex: Casamento: Ana & João" style={{ borderBottomWidth: 1, paddingVertical: 6 }} />
        {errors.title && <Text style={{ color: 'red' }}>{errors.title}</Text>}

        <Text style={{ marginTop: 12 }}>Data</Text>
        <TextInput value={payload.date} onChangeText={(t) => setField('date', t)} placeholder="YYYY-MM-DD" style={{ borderBottomWidth: 1, paddingVertical: 6 }} />
        {errors.date && <Text style={{ color: 'red' }}>{errors.date}</Text>}

        <Text style={{ marginTop: 12 }}>Local</Text>
        <TextInput value={payload.location} onChangeText={(t) => setField('location', t)} placeholder="Ex: Igreja Matriz" style={{ borderBottomWidth: 1, paddingVertical: 6 }} />
        {errors.location && <Text style={{ color: 'red' }}>{errors.location}</Text>}

        <View style={{ height: 12 }} />
        <Button title={submitting ? 'Salvando...' : 'Salvar'} onPress={handleSave} disabled={submitting} />
      </View>
    </ScrollView>
  );
}
