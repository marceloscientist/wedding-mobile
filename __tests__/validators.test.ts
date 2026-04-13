import { validateEvent } from '../validators/eventValidator';

describe('Event Validator', () => {
  
  describe('Title Validation', () => {
    it('should reject empty title', () => {
      const result = validateEvent({ title: '', date: '2026-12-25' });
      expect(result.valid).toBe(false);
      expect(result.errors.title).toBeDefined();
    });

    it('should reject title with less than 3 characters', () => {
      const result = validateEvent({ title: 'AB', date: '2026-12-25' });
      expect(result.valid).toBe(false);
      expect(result.errors.title).toBeDefined();
    });

    it('should accept valid title', () => {
      const result = validateEvent({ title: 'Casamento: Ana & João', date: '2026-12-25' });
      expect(result.errors.title).toBeUndefined();
    });
  });

  describe('Date Validation', () => {
    it('should reject empty date', () => {
      const result = validateEvent({ title: 'Event', date: '' });
      expect(result.valid).toBe(false);
      expect(result.errors.date).toBeDefined();
    });

    it('should reject invalid date format', () => {
      const result = validateEvent({ title: 'Event', date: '25/12/2026' });
      expect(result.valid).toBe(false);
      expect(result.errors.date).toBeDefined();
    });

    it('should reject invalid date value', () => {
      const result = validateEvent({ title: 'Event', date: '2026-13-32' });
      expect(result.valid).toBe(false);
      expect(result.errors.date).toBeDefined();
    });

    it('should accept valid ISO date', () => {
      const result = validateEvent({ title: 'Event', date: '2026-12-25' });
      expect(result.errors.date).toBeUndefined();
    });
  });

  describe('Location Validation', () => {
    it('should accept empty location', () => {
      const result = validateEvent({ title: 'Event', date: '2026-12-25', location: '' });
      expect(result.errors.location).toBeUndefined();
    });

    it('should reject location longer than 200 characters', () => {
      const longLocation = 'a'.repeat(201);
      const result = validateEvent({ title: 'Event', date: '2026-12-25', location: longLocation });
      expect(result.valid).toBe(false);
      expect(result.errors.location).toBeDefined();
    });

    it('should accept location up to 200 characters', () => {
      const location = 'a'.repeat(200);
      const result = validateEvent({ title: 'Event', date: '2026-12-25', location });
      expect(result.errors.location).toBeUndefined();
    });
  });

  describe('Complete Validation', () => {
    it('should validate complete valid event', () => {
      const result = validateEvent({
        title: 'Casamento: Ana & João',
        date: '2026-05-15',
        location: 'Igreja Matriz',
        description: 'Celebração especial',
      });
      expect(result.valid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('should reject event with multiple validation errors', () => {
      const result = validateEvent({
        title: 'AB',
        date: '25/12/2026',
        location: 'a'.repeat(201),
      });
      expect(result.valid).toBe(false);
      expect(result.errors.title).toBeDefined();
      expect(result.errors.date).toBeDefined();
      expect(result.errors.location).toBeDefined();
    });
  });
});
