export type EventPayload = {
  title: string;
  date: string; // ISO YYYY-MM-DD
  location?: string;
  description?: string;
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
      errors.date = 'Formato da data inválido (use YYYY-MM-DD)';
    } else {
      const y = Number(m[1]), mo = Number(m[2]) - 1, d = Number(m[3]);
      const dt = new Date(y, mo, d);
      if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) {
        errors.date = 'Data inválida';
      }
    }
  }

  // optional location length check
  if (payload.location && payload.location.length > 200) {
    errors.location = 'Local muito longo';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export default { validateEvent };
