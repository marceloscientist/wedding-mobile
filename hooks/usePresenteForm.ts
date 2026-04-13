import { useState } from 'react';
import { PresentAPI } from '../services';
import { validatePresente, PresentePayload, ValidationResult } from '../validators/presenteValidator';
import { logger } from '../utils/logger';

export function usePresenteForm(initialData?: any) {
  const [payload, setPayload] = useState<Partial<PresentePayload>>(initialData || { title: '' });
  const [errors, setErrors] = useState<ValidationResult['errors']>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (k: keyof PresentePayload, v: string) => setPayload((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    logger.debug('usePresenteForm', 'Validating presente', { payload });
    const res = validatePresente(payload);
    setErrors(res.errors);
    if (!res.valid) {
      logger.warn('usePresenteForm', 'Validation failed', res.errors);
      return { ok: false, errors: res.errors };
    }
    setSubmitting(true);
    try {
      const isEdit = initialData && initialData.id;
      if (isEdit) {
        logger.info('usePresenteForm', 'Submitting presente update', { id: initialData.id, title: payload.title });
        const updated = await PresentAPI.update(initialData.id, payload as PresentePayload);
        logger.info('usePresenteForm', `Presente updated successfully: id=${(updated as any)?.id}`);
        return { ok: true, updated };
      } else {
        logger.info('usePresenteForm', 'Submitting presente creation', { title: payload.title });
        const created = await PresentAPI.create(payload as PresentePayload);
        logger.info('usePresenteForm', `Presente created successfully: id=${created.id}`);
        return { ok: true, created };
      }
    } catch (e) {
      logger.error('usePresenteForm', 'Error submitting presente', e as Error);
      return { ok: false, error: e };
    } finally {
      setSubmitting(false);
    }
  };

  return { payload, setField, submit, errors, submitting };
}

export default usePresenteForm;
