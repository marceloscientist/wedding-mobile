import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const logo = require('../assets/logo.png');
const splash = require('../assets/splash.jpg');

export default function Splash({ navigation }: any) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Dashboard'), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={splash} style={styles.splash} resizeMode="cover" />
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Casaki</Text>
        <Text style={styles.sub}>Carregando...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  splash: { position: 'absolute', width: '100%', height: '100%' },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 120, height: 120, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '700', color: '#222' },
  sub: { marginTop: 6, color: '#333' },
});
