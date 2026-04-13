import { useState } from 'react';
import { EventAPI } from '../services';
import { validateEvent, EventPayload, ValidationResult } from '../validators/eventValidator';
import { logger } from '../utils/logger';

export function useEventForm(initialData?: any) {
  const initialPayload = initialData ? {
    title: initialData.title || '',
    date: initialData.date || '',
    location: initialData.location || '',
    description: initialData.description || '',
    guests: initialData.guests || 0,
  } : {
    title: '',
    date: '',
    location: '',
    description: '',
    guests: 0,
  };
  
  const [payload, setPayload] = useState<Partial<EventPayload>>(initialPayload);
  const [errors, setErrors] = useState<ValidationResult['errors']>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (k: keyof EventPayload, v: string | number) => setPayload((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    logger.debug('useEventForm', 'Validating event', { payload });
    const res = validateEvent(payload);
    setErrors(res.errors);
    if (!res.valid) {
      logger.warn('useEventForm', 'Validation failed', res.errors);
      return { ok: false, errors: res.errors };
    }
    setSubmitting(true);
    try {
      const isEdit = initialData && initialData.id;
      if (isEdit) {
        logger.info('useEventForm', 'Submitting event update', { id: initialData.id, title: payload.title, date: payload.date, guests: payload.guests });
        const updated = await EventAPI.update(initialData.id, payload as EventPayload);
        logger.info('useEventForm', `Event updated successfully: id=${(updated as any)?.id}`);
        return { ok: true, updated };
      } else {
        logger.info('useEventForm', 'Submitting event creation', { title: payload.title, date: payload.date, guests: payload.guests });
        const created = await EventAPI.create(payload as EventPayload);
        logger.info('useEventForm', `Event created successfully: id=${created.id}`);
        return { ok: true, created };
      }
    } catch (e) {
      logger.error('useEventForm', 'Error submitting event', e as Error);
      return { ok: false, error: e };
    } finally {
      setSubmitting(false);
    }
  };

  return { payload, setField, submit, errors, submitting };
}

export default useEventForm;
