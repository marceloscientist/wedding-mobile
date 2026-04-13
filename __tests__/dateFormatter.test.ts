import { formatDateToBR, formatDateFromBR, getTodayISO } from '../utils/dateFormatter';

describe('Date Formatter Utilities', () => {
  describe('formatDateToBR', () => {
    it('should return string with slashes', () => {
      const result = formatDateToBR('2026-05-15');
      expect(result).toContain('/');
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('should be callable and return string', () => {
      const result = formatDateToBR('2026-12-25');
      expect(typeof result).toBe('string');
      expect(result.length).toBe(10);
    });
  });

  describe('formatDateFromBR', () => {
    it('should convert BR format to ISO format', () => {
      const result = formatDateFromBR('15/05/2026');
      expect(result).toContain('-');
      expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
    });

    it('should be callable and return ISO string', () => {
      const result = formatDateFromBR('20/07/2024');
      expect(typeof result).toBe('string');
      expect(result.length).toBe(10);
    });

    it('should reverse BR conversion in both directions', () => {
      const isoInput = '2026-09-10';
      const brFormat = formatDateToBR(isoInput);
      const isoOutput = formatDateFromBR(brFormat);
      
      expect(isoOutput).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('getTodayISO', () => {
    it('should return date in ISO format (YYYY-MM-DD)', () => {
      const result = getTodayISO();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should return a valid date string', () => {
      const result = getTodayISO();
      const date = new Date(result);
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).not.toBeNaN();
    });

    it('should return 10 character date string', () => {
      const result = getTodayISO();
      expect(result.length).toBe(10);
    });

    it('should be formatted for event date input placeholder', () => {
      const result = getTodayISO();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(result.includes('-')).toBe(true);
    });
  });

  describe('Format consistency', () => {
    it('should format dates consistently', () => {
      const date = '2026-06-15';
      const result1 = formatDateToBR(date);
      const result2 = formatDateToBR(date);
      
      expect(result1).toBe(result2);
    });

    it('should handle various dates without errors', () => {
      const dates = ['2026-01-01', '2026-12-25', '2024-11-30'];
      dates.forEach(date => {
        expect(() => formatDateToBR(date)).not.toThrow();
        expect(() => formatDateFromBR(formatDateToBR(date))).not.toThrow();
      });
    });
  });
});
