import { logger } from '../utils/logger';

export type PresentePayload = {
  title: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: Partial<Record<keyof PresentePayload, string>>;
};

export function validatePresente(payload: Partial<PresentePayload>): ValidationResult {
  const errors: Partial<Record<keyof PresentePayload, string>> = {};

  if (!payload.title || !payload.title.trim()) {
    errors.title = 'Título do presente é obrigatório';
  } else if (payload.title.trim().length < 3) {
    errors.title = 'Título deve ter pelo menos 3 caracteres';
  }

  const valid = Object.keys(errors).length === 0;
  if (!valid) {
    logger.warn('presenteValidator', 'Validation failed', errors);
  } else {
    logger.debug('presenteValidator', 'Validation passed', { title: payload.title });
  }
  return { valid, errors };
}

export default { validatePresente };
