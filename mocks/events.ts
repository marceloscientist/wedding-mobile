import { logger } from '../utils/logger';
import { db } from './database';

export const listEvents = async () => {
  await new Promise((r) => setTimeout(r, 120));
  logger.debug('EventsMock', `listEvents: returning ${db.events.length} events`);
  return [...db.events];
};

export const getEvent = async (id: string) => {
  await new Promise((r) => setTimeout(r, 80));
  const result = db.events.find((d) => d.id === id) ?? null;
  logger.debug('EventsMock', `getEvent(${id}): found = ${result ? 'yes' : 'no'}`);
  return result;
};

export const createEvent = async (payload: any) => {
  const newItem = { id: String(Date.now()), title: payload.title || 'Novo evento', date: payload.date || '', location: payload.location, guests: payload.guests || 0, description: payload.description };
  db.events = [newItem, ...db.events];
  logger.info('EventsMock', `createEvent: created new event with id=${newItem.id}, title=${newItem.title}, date=${newItem.date}`);
  logger.debug('EventsMock', `DB now has ${db.events.length} events`);
  return newItem;
};

export const updateEvent = async (id: string, payload: any) => {
  let updated = null;
  db.events = db.events.map((d) => {
    if (d.id === id) {
      updated = { ...d, ...payload };
      return updated;
    }
    return d;
  });
  if (updated) {
    logger.info('EventsMock', `updateEvent(${id}): updated successfully`);
  }
  return updated;
};

export const deleteEvent = async (id: string) => {
  await new Promise((r) => setTimeout(r, 100));
  const before = db.events.length;
  db.events = db.events.filter((d) => d.id !== id);
  const deleted = db.events.length < before;
  if (deleted) {
    logger.info('EventsMock', `deleteEvent(${id}): DELETED successfully ✓ DB now has ${db.events.length} events`);
  } else {
    logger.warn('EventsMock', `deleteEvent(${id}): event not found`);
  }
  return deleted;
};

export default { listEvents, getEvent, createEvent, updateEvent, deleteEvent };
