import { useState } from 'react';
import { PadrinhoAPI } from '../services';
import { validatePadrinho, PadrinhoPayload, ValidationResult } from '../validators/padrinhoValidator';
import { logger } from '../utils/logger';

export function usePadrinhoForm(initialData?: any) {
  const initialPayload = initialData ? {
    name: initialData.name || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
  } : {
    name: '',
    phone: '',
    email: '',
  };
  
  const [payload, setPayload] = useState<Partial<PadrinhoPayload>>(initialPayload);
  const [errors, setErrors] = useState<ValidationResult['errors']>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (k: keyof PadrinhoPayload, v: string) => setPayload((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    logger.debug('usePadrinhoForm', 'Validating padrinho', { payload });
    const res = validatePadrinho(payload);
    setErrors(res.errors);
    if (!res.valid) {
      logger.warn('usePadrinhoForm', 'Validation failed', res.errors);
      return { ok: false, errors: res.errors };
    }
    setSubmitting(true);
    try {
      const isEdit = initialData && initialData.id;
      if (isEdit) {
        logger.info('usePadrinhoForm', 'Submitting padrinho update', { id: initialData.id, name: payload.name, phone: payload.phone });
        const updated = await PadrinhoAPI.update(initialData.id, payload as PadrinhoPayload);
        logger.info('usePadrinhoForm', `Padrinho updated successfully: id=${(updated as any)?.id}`);
        return { ok: true, updated };
      } else {
        logger.info('usePadrinhoForm', 'Submitting padrinho creation', { name: payload.name, phone: payload.phone });
        const created = await PadrinhoAPI.create(payload as PadrinhoPayload);
        logger.info('usePadrinhoForm', `Padrinho created successfully: id=${created.id}`);
        return { ok: true, created };
      }
    } catch (e) {
      logger.error('usePadrinhoForm', 'Error submitting padrinho', e as Error);
      return { ok: false, error: e };
    } finally {
      setSubmitting(false);
    }
  };

  return { payload, setField, submit, errors, submitting };
}

export default usePadrinhoForm;
