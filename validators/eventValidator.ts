import { logger } from '../utils/logger';

export type EventPayload = {
  title: string;
  date: string; // ISO YYYY-MM-DD
  location?: string;
  description?: string;
  guests?: number;
};

export type ValidationResult = {
  valid: boolean;
  errors: Partial<Record<keyof EventPayload, string>>;
};

export function validateEvent(payload: Partial<EventPayload>): ValidationResult {
  const errors: Partial<Record<keyof EventPayload, string>> = {};

  if (!payload.title || !payload.title.trim()) {
    errors.title = 'Título é obrigatório';
  } else if (payload.title.trim().length < 3) {
    errors.title = 'Título deve ter ao menos 3 caracteres';
  }

  if (!payload.date || !payload.date.trim()) {
    errors.date = 'Data é obrigatória';
  } else {
    // basic YYYY-MM-DD check
    const m = payload.date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) {
      errors.date = 'Formato inválido (use YYYY-MM-DD)';
    } else {
      const y = Number(m[1]), mo = Number(m[2]) - 1, d = Number(m[3]);
      const dt = new Date(y, mo, d);
      if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) {
        errors.date = 'Data inválida';
      }
    }
  }

  if (payload.location && payload.location.length > 200) {
    errors.location = 'Local muito longo (máx 200 caracteres)';
  }

  if (payload.guests !== undefined && payload.guests !== null) {
    if (payload.guests < 0) {
      errors.guests = 'Número de convidados não pode ser negativo';
    } else if (!Number.isInteger(payload.guests)) {
      errors.guests = 'Número de convidados deve ser um número inteiro';
    }
  }

  const valid = Object.keys(errors).length === 0;
  if (!valid) {
    logger.warn('eventValidator', 'Validation failed', errors);
  } else {
    logger.debug('eventValidator', 'Validation passed', { title: payload.title });
  }
  return { valid, errors };
}

export default { validateEvent };
