import { StyleSheet } from 'react-native';
import { weddingColors } from './theme/colors';

export const colors = weddingColors;

export default StyleSheet.create({
  page: { 
    flex: 1, 
    backgroundColor: weddingColors.background 
  },
  
  container: { 
    padding: 16 
  },
  
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  
  card: { 
    backgroundColor: weddingColors.surfaceLight, 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    borderWidth: 1,
    borderColor: '#F0EDF7',
    shadowColor: '#000', 
    shadowOpacity: 0.08, 
    shadowRadius: 8, 
    elevation: 2 
  },
  
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: weddingColors.textPrimary 
  },
  
  cardMeta: { 
    marginTop: 8, 
    color: weddingColors.textSecondary, 
    fontSize: 13,
    fontWeight: '400'
  },
  
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: weddingColors.textPrimary, 
    marginBottom: 12 
  },
  
  cardIconRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12 
  },
  
  cardIcon: { 
    width: 72, 
    height: 72, 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: weddingColors.background
  },
  
  cardIconText: { 
    fontSize: 32 
  },
});

