import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#6C63FF',
  background: '#F6F7FB',
  card: '#FFFFFF',
  text: '#222',
  muted: '#6B7280',
};

export default StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  container: { padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  card: { backgroundColor: colors.card, borderRadius: 10, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  cardMeta: { marginTop: 6, color: colors.muted, fontSize: 13 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 },
  cardIconRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardIcon: { width: 72, height: 72, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  cardIconText: { fontSize: 28 },
});

