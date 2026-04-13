import { logger } from '../utils/logger';

export type PadrinhoPayload = {
  name: string;
  phone?: string;
  email?: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: Partial<Record<keyof PadrinhoPayload, string>>;
};

export function validatePadrinho(payload: Partial<PadrinhoPayload>): ValidationResult {
  const errors: Partial<Record<keyof PadrinhoPayload, string>> = {};

  if (!payload.name || !payload.name.trim()) {
    errors.name = 'Nome é obrigatório';
  } else if (payload.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres';
  }

  // Telefone: permitir vazio (opcional) ou validar se preenchido
  if (payload.phone && payload.phone.trim().length > 0) {
    const phoneClean = payload.phone.replace(/\D/g, '');
    // Aceitar 10 ou 11 dígitos (com DDD)
    if (phoneClean.length < 10) {
      errors.phone = 'Telefone deve ter pelo menos 10 dígitos (com DDD). Ex: (11) 99999-0001';
    }
  }

  if (payload.email && payload.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      errors.email = 'Email inválido';
    }
  }

  const valid = Object.keys(errors).length === 0;
  if (!valid) {
    logger.warn('padrinhoValidator', 'Validation failed', errors);
  } else {
    logger.debug('padrinhoValidator', 'Validation passed', { name: payload.name });
  }
  return { valid, errors };
}

export default { validatePadrinho };
