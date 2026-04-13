/**
 * E2E Delete Test - Simula exatamente o fluxo do web
 */

import { EventAPI, PadrinhoAPI, PresentAPI } from '../services';
import { db } from '../mocks/database';

describe('DELETE E2E - Complete Flow', () => {
  beforeEach(() => {
    // Reset database
    db.events = [
      { id: '1', title: 'Test Event', date: '2026-05-15', location: 'Test', guests: 10 },
    ];
    db.padrinhos = [
      { id: 'p1', name: 'Test Padrinho', phone: '123456' },
    ];
    db.presentes = [
      { id: 'pr1', title: 'Test Presente', purchasedBy: null, purchasedByType: null },
    ];
  });

  it('E2E: Should create, retrieve, and delete event', async () => {
    // Initial state
    let events = await EventAPI.list();
    console.log('Initial events:', events.length);
    expect(events.length).toBe(1);

    // Get first event
    const eventToDelete = events[0];
    console.log('Event to delete:', eventToDelete.id, eventToDelete.title);

    // Delete it
    const deleteResult = await EventAPI.delete(eventToDelete.id);
    console.log('Delete result:', deleteResult);
    expect(deleteResult).toBe(true);

    // Verify it's gone
    events = await EventAPI.list();
    console.log('Events after delete:', events.length);
    expect(events.length).toBe(0);

    // Try to get it directly
    const retrieved = await EventAPI.get(eventToDelete.id);
    console.log('Retrieved after delete:', retrieved);
    expect(retrieved).toBeNull();
  });

  it('E2E: Should create, retrieve, and delete padrinho', async () => {
    let padrinhos = await PadrinhoAPI.list();
    expect(padrinhos.length).toBe(1);

    const pToDelete = padrinhos[0];
    const deleteResult = await PadrinhoAPI.delete(pToDelete.id);
    expect(deleteResult).toBe(true);

    padrinhos = await PadrinhoAPI.list();
    expect(padrinhos.length).toBe(0);
  });

  it('E2E: Should create, retrieve, and delete presente', async () => {
    let presentes = await PresentAPI.list();
    expect(presentes.length).toBe(1);

    const prToDelete = presentes[0];
    const deleteResult = await PresentAPI.delete(prToDelete.id);
    expect(deleteResult).toBe(true);

    presentes = await PresentAPI.list();
    expect(presentes.length).toBe(0);
  });

  it('E2E: Multiple deletes should work sequentially', async () => {
    // Add more events
    db.events = [
      { id: '1', title: 'Event 1', date: '2026-05-15', location: 'Test' },
      { id: '2', title: 'Event 2', date: '2026-06-15', location: 'Test' },
      { id: '3', title: 'Event 3', date: '2026-07-15', location: 'Test' },
    ];

    let events = await EventAPI.list();
    expect(events.length).toBe(3);

    // Delete first
    await EventAPI.delete('1');
    events = await EventAPI.list();
    expect(events.length).toBe(2);

    // Delete second
    await EventAPI.delete('2');
    events = await EventAPI.list();
    expect(events.length).toBe(1);

    // Delete third
    await EventAPI.delete('3');
    events = await EventAPI.list();
    expect(events.length).toBe(0);
  });
});
