import { EventAPI, PadrinhoAPI, PresentAPI } from '../services/api';

describe('API Service - Integration Tests', () => {
  describe('EventAPI', () => {
    it('should expose all CRUD methods', () => {
      expect(EventAPI.list).toBeDefined();
      expect(EventAPI.get).toBeDefined();
      expect(EventAPI.create).toBeDefined();
      expect(EventAPI.update).toBeDefined();
      expect(EventAPI.delete).toBeDefined();
    });

    it('should be functions', () => {
      expect(typeof EventAPI.list).toBe('function');
      expect(typeof EventAPI.get).toBe('function');
      expect(typeof EventAPI.create).toBe('function');
      expect(typeof EventAPI.update).toBe('function');
      expect(typeof EventAPI.delete).toBe('function');
    });

    it('should create event through API', async () => {
      const payload = {
        title: 'API Test Event',
        date: '2026-07-10'
      };
      const event = await EventAPI.create(payload);
      expect(event.id).toBeDefined();
      expect(event.title).toBe('API Test Event');
    });

    it('should list events through API', async () => {
      const events = await EventAPI.list();
      expect(Array.isArray(events)).toBe(true);
      expect(events.length).toBeGreaterThan(0);
    });

    it('should retrieve single event through API', async () => {
      const events = await EventAPI.list();
      if (events.length > 0) {
        const event = await EventAPI.get(events[0].id);
        expect(event?.id).toBe(events[0].id);
      }
    });
  });

  describe('PadrinhoAPI', () => {
    it('should expose all CRUD methods', () => {
      expect(PadrinhoAPI.list).toBeDefined();
      expect(PadrinhoAPI.get).toBeDefined();
      expect(PadrinhoAPI.create).toBeDefined();
      expect(PadrinhoAPI.update).toBeDefined();
      expect(PadrinhoAPI.delete).toBeDefined();
    });

    it('should create padrinho through API', async () => {
      const payload = {
        name: 'API Padrinho Test',
        phone: '11 99999-9999'
      };
      const padrinho = await PadrinhoAPI.create(payload);
      expect(padrinho.id).toBeDefined();
      expect(padrinho.name).toBe('API Padrinho Test');
    });

    it('should list padrinhos through API', async () => {
      const padrinhos = await PadrinhoAPI.list();
      expect(Array.isArray(padrinhos)).toBe(true);
    });

    it('should update padrinho through API', async () => {
      const padrinhos = await PadrinhoAPI.list();
      if (padrinhos.length > 0) {
        const updated = await PadrinhoAPI.update(padrinhos[0].id, {
          name: 'Updated Padrinho'
        });
        if (updated) {
          expect((updated as any).name).toBe('Updated Padrinho');
        }
      }
    });
  });

  describe('PresentAPI', () => {
    it('should expose all CRUD methods plus markAsPurchased', () => {
      expect(PresentAPI.list).toBeDefined();
      expect(PresentAPI.get).toBeDefined();
      expect(PresentAPI.create).toBeDefined();
      expect(PresentAPI.update).toBeDefined();
      expect(PresentAPI.delete).toBeDefined();
      expect(PresentAPI.markAsPurchased).toBeDefined();
    });

    it('should create presente through API', async () => {
      const payload = { title: 'API Presente Test' };
      const presente = await PresentAPI.create(payload);
      expect(presente.id).toBeDefined();
      expect(presente.title).toBe('API Presente Test');
    });

    it('should list presentes through API', async () => {
      const presentes = await PresentAPI.list();
      expect(Array.isArray(presentes)).toBe(true);
    });

    it('should mark presente as purchased through API', async () => {
      const presentes = await PresentAPI.list();
      if (presentes.length > 0) {
        const unpurchased = presentes.find(p => !p.purchasedBy);
        if (unpurchased) {
          const marked = await PresentAPI.markAsPurchased(unpurchased.id, 'Test User', 'self');
          expect(marked).toBe(true);
        }
      }
    });

    it('should delete presente through API', async () => {
      const payload = { title: 'To Delete' };
      const created = await PresentAPI.create(payload);
      const deleted = await PresentAPI.delete(created.id);
      expect(deleted).toBe(true);
    });
  });

  describe('API Response Types', () => {
    it('should return event objects with expected properties', async () => {
      const events = await EventAPI.list();
      if (events.length > 0) {
        const event = events[0];
        expect(event.id).toBeDefined();
        expect(event.title).toBeDefined();
        expect(event.date).toBeDefined();
      }
    });

    it('should return padrinho objects with expected properties', async () => {
      const padrinhos = await PadrinhoAPI.list();
      if (padrinhos.length > 0) {
        const padrinho = padrinhos[0];
        expect(padrinho.id).toBeDefined();
        expect(padrinho.name).toBeDefined();
      }
    });

    it('should return presente objects with expected properties', async () => {
      const presentes = await PresentAPI.list();
      if (presentes.length > 0) {
        const presente = presentes[0];
        expect(presente.id).toBeDefined();
        expect(presente.title).toBeDefined();
      }
    });
  });
});
