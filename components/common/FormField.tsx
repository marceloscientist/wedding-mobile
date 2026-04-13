import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { weddingColors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'number-pad';
  editable?: boolean;
  style?: ViewStyle;
}

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  required = false,
  multiline = false,
  keyboardType = 'default',
  editable = true,
  style,
}: FormFieldProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>
      <TextInput
        style={[
          styles.input,
          ...(error ? [styles.inputError] : []),
          ...(multiline ? [styles.inputMultiline] : []),
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={weddingColors.textMuted}
        multiline={multiline}
        keyboardType={keyboardType}
        editable={editable}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  labelRow: {
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: weddingColors.textPrimary,
  },

  required: {
    color: weddingColors.error,
  },

  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: weddingColors.unpurchased,
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 14,
    color: weddingColors.textPrimary,
    fontWeight: '500',
  },

  inputMultiline: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: weddingColors.unpurchased,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    textAlignVertical: 'top',
  },

  inputError: {
    borderBottomColor: weddingColors.error,
    borderColor: weddingColors.error,
  },

  errorText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    color: weddingColors.error,
  },
});
