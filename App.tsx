import 'react-native-gesture-handler';
import './suppressWarnings';
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './screens/Splash';
import Dashboard from './screens/Dashboard';
import EventosLista from './screens/EventosLista';
import EventoDetail from './screens/EventoDetail';
import PadrinhosLista from './screens/PadrinhosLista';
import PadrinhoDetail from './screens/PadrinhoDetail';
import CadastroEventos from './screens/CadastroEventos';
import CadastroPadrinhos from './screens/CadastroPadrinhos';
import CadastroPresentes from './screens/CadastroPresentes';
import ListaPresentes from './screens/ListaPresentes';

const Stack = createNativeStackNavigator();

export default function App() {
  const isMock = typeof process !== 'undefined' && (process?.env?.MOCK === 'true' || process?.env?.MOCK === '1');

  return (
    <>
      {isMock && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999 }}>
          <View style={{ backgroundColor: '#ffdfdf', padding: 8 }}>
            <Text style={{ color: '#800', textAlign: 'center', fontWeight: '700' }}>MOCK MODE ACTIVE — dados em memória (sem backend)</Text>
          </View>
        </View>
      )}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="EventosLista" component={EventosLista} />
        <Stack.Screen name="EventoDetail" component={EventoDetail} />
        <Stack.Screen name="PadrinhosLista" component={PadrinhosLista} />
        <Stack.Screen name="PadrinhoDetail" component={PadrinhoDetail} />
        <Stack.Screen name="CadastroEventos" component={CadastroEventos} />
        <Stack.Screen name="CadastroPadrinhos" component={CadastroPadrinhos} />
        <Stack.Screen name="CadastroPresentes" component={CadastroPresentes} />
        <Stack.Screen name="ListaPresentes" component={ListaPresentes} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
