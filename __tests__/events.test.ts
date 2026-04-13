import * as events from '../mocks/events';

describe('EventAPI - CRUD Operations', () => {
  
  beforeEach(() => {
    // Reset DB between tests
    jest.resetModules();
  });

  describe('CREATE - Event Creation', () => {
    it('should add new event to the list', async () => {
      const eventBefore = await events.listEvents();
      const initialCount = eventBefore.length;

      const newEvent = await events.createEvent({
        title: 'Teste: Novo evento',
        date: '2026-12-25',
        location: 'Local de teste',
      });

      expect(newEvent.id).toBeDefined();
      expect(newEvent.title).toBe('Teste: Novo evento');
      expect(newEvent.date).toBe('2026-12-25');
      expect(newEvent.location).toBe('Local de teste');

      const eventAfter = await events.listEvents();
      expect(eventAfter.length).toBe(initialCount + 1);
    });

    it('should generate IDs for new events', async () => {
      const event1 = await events.createEvent({
        title: 'Event 1',
        date: '2026-12-25',
      });

      const event2 = await events.createEvent({
        title: 'Event 2',
        date: '2026-12-26',
      });

      expect(event1.id).toBeDefined();
      expect(event2.id).toBeDefined();
      expect(typeof event1.id).toBe('string');
      expect(typeof event2.id).toBe('string');
    });
  });

  describe('READ - Event Retrieval', () => {
    it('should list all events', async () => {
      const events_list = await events.listEvents();
      expect(Array.isArray(events_list)).toBe(true);
      expect(events_list.length).toBeGreaterThan(0);
    });

    it('should retrieve specific event by ID', async () => {
      const all_events = await events.listEvents();
      const first_event = all_events[0];

      const retrieved = await events.getEvent(first_event.id);
      expect(retrieved).toEqual(first_event);
      expect(retrieved?.title).toBeDefined();
    });

    it('should return null for non-existent event ID', async () => {
      const retrieved = await events.getEvent('non-existent-id');
      expect(retrieved).toBeNull();
    });
  });

  describe('UPDATE - Event Modification', () => {
    it('should update existing event', async () => {
      const eventsBefore = await events.listEvents();
      const eventToUpdate = eventsBefore[0];

      const updated = await events.updateEvent(eventToUpdate.id, {
        title: 'Updated Title',
        location: 'Updated Location',
      });

      expect(updated).not.toBeNull();
      if (updated) {
        expect((updated as any).title).toBe('Updated Title');
        expect((updated as any).location).toBe('Updated Location');
      }
    });

    it('should return null when updating non-existent event', async () => {
      const updated = await events.updateEvent('non-existent', {
        title: 'New Title',
      });

      expect(updated).toBeNull();
    });
  });

  describe('DELETE - Event Removal', () => {
    it('should remove event from the list', async () => {
      const eventsBefore = await events.listEvents();
      const eventToDelete = eventsBefore[0];

      const result = await events.deleteEvent(eventToDelete.id);
      expect(result).toBe(true);
      
      const deleted = await events.getEvent(eventToDelete.id);
      expect(deleted).toBeNull();
    });

    it('should return false when deleting non-existent event', async () => {
      const result = await events.deleteEvent('non-existent-id');
      expect(result).toBe(false);
    });
  });

  describe('Data Integrity', () => {
    it('should return events data with correct structure', async () => {
      const event1 = await events.getEvent('1');

      if (event1) {
        expect(event1.id).toBeDefined();
        expect(event1.title).toBeDefined();
        expect(event1.date).toBeDefined();
      }
    });

    it('should list events as array', async () => {
      const eventsList = await events.listEvents();

      expect(Array.isArray(eventsList)).toBe(true);
      if (eventsList.length > 0) {
        expect(eventsList[0].id).toBeDefined();
        expect(eventsList[0].title).toBeDefined();
      }
    });
  });
});
