/**
 * DatePickerField Component - Cross-platform date picker with web fallback
 * Uses native date picker on mobile, HTML input date on web
 */

import React, { useState, lazy, Suspense } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { formatDateToBR, getTodayISO } from './dateFormatter';
import { logger } from './logger';

// Lazy load native date picker only on mobile
let DatePicker: any = null;
if (Platform.OS !== 'web') {
  try {
    DatePicker = require('react-native-date-picker').default;
  } catch (e) {
    logger.warn('DatePickerField', 'Failed to load react-native-date-picker', e as Error);
  }
}

interface DatePickerFieldProps {
  value: string;
  onChange: (dateISO: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  value,
  onChange,
  label,
  required = false,
  placeholder = 'Selecione uma data',
  error
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState(new Date(value || getTodayISO()));

  logger.debug('DatePickerField', `Rendering with value: ${value}`);

  const handleDateConfirm = (date: Date) => {
    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const iso = `${year}-${month}-${day}`;
      
      logger.info('DatePickerField', `Date selected: ${iso} (display: ${formatDateToBR(iso)})`);
      
      onChange(iso);
      setShowDatePicker(false);
    } catch (err) {
      logger.error('DatePickerField', 'Error handling date confirm', err as Error);
    }
  };

  // Web platform - use HTML date input
  if (Platform.OS === 'web') {
    return (
      <View style={{ marginVertical: 8 }}>
        {label && (
          <Text style={{ fontWeight: '600', marginBottom: 8 }}>
            {label} {required && '*'}
          </Text>
        )}
        <input
          type="date"
          value={value}
          onChange={(e) => {
            logger.debug('DatePickerField', `HTML input changed: ${e.target.value}`);
            onChange(e.target.value);
          }}
          style={{
            borderBottomWidth: 1,
            paddingVertical: 8,
            fontSize: 16,
            borderColor: error ? '#cc0000' : '#ccc'
          } as any}
          defaultValue={getTodayISO()}
        />
        {error && <Text style={{ color: 'red', marginTop: 4 }}>{error}</Text>}
      </View>
    );
  }

  // Mobile platform - use react-native-date-picker
  return (
    <View>
      {label && (
        <Text style={{ marginTop: 12, fontWeight: '600' }}>
          {label} {required && '*'}
        </Text>
      )}
      <TouchableOpacity 
        onPress={() => {
          logger.info('DatePickerField', 'Opening date picker');
          setShowDatePicker(true);
        }}
        style={{ borderBottomWidth: 1, paddingVertical: 8 }}
      >
        <Text style={{ fontSize: 16 }}>
          {value ? formatDateToBR(value) : placeholder}
        </Text>
      </TouchableOpacity>
      {error && <Text style={{ color: 'red', marginTop: 4 }}>{error}</Text>}

      <DatePicker
        modal
        open={showDatePicker}
        date={dateValue}
        onConfirm={handleDateConfirm}
        onCancel={() => {
          logger.debug('DatePickerField', 'Date picker cancelled');
          setShowDatePicker(false);
        }}
        title="Selecione a data"
        confirmText="Confirmar"
        cancelText="Cancelar"
        locale="pt-BR"
      />
    </View>
  );
};
