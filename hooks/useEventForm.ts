import { useState } from 'react';
import { EventAPI } from '../services';
import { validateEvent, EventPayload, ValidationResult } from '../validators/eventValidator';

export function useEventForm() {
  const [payload, setPayload] = useState<Partial<EventPayload>>({ title: '', date: '', location: '' });
  const [errors, setErrors] = useState<ValidationResult['errors']>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (k: keyof EventPayload, v: string) => setPayload((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    const res = validateEvent(payload);
    setErrors(res.errors);
    if (!res.valid) return { ok: false, errors: res.errors };
    setSubmitting(true);
    try {
      const created = await EventAPI.create(payload as EventPayload);
      return { ok: true, created };
    } catch (e) {
      return { ok: false, error: e };
    } finally {
      setSubmitting(false);
    }
  };

  return { payload, setField, submit, errors, submitting };
}

export default useEventForm;
