import { logger } from '../utils/logger';
import { db } from './database';

type Presente = { id: string; title: string; purchasedBy?: string | null; purchasedByType?: 'self' | 'padrinho' | null };

export const listPresentes = async (): Promise<Presente[]> => {
  await new Promise((r) => setTimeout(r, 80));
  const result = [...db.presentes];
  logger.debug('PresentesMock', `listPresentes: returning ${result.length} presentes`);
  return result;
};

export const getPresenteById = async (id: string): Promise<Presente | null> => {
  await new Promise((r) => setTimeout(r, 60));
  const result = db.presentes.find((p) => p.id === id) ?? null;
  logger.debug('PresentesMock', `getPresenteById(${id}): found = ${result ? 'yes' : 'no'}`);
  return result;
};

export const createPresente = async (payload: Partial<Presente>): Promise<Presente> => {
  const item = { id: String(Date.now()), title: payload.title || 'Novo presente', purchasedBy: null, purchasedByType: null } as Presente;
  db.presentes = [item, ...db.presentes];
  logger.info('PresentesMock', `createPresente: created new presente with id=${item.id}, title=${item.title}`);
  logger.debug('PresentesMock', `DB now has ${db.presentes.length} presentes`);
  return item;
};

export const updatePresente = async (id: string, payload: Partial<Presente>): Promise<Presente | null> => {
  let updated: Presente | null = null;
  db.presentes = db.presentes.map((p) => {
    if (p.id === id) {
      updated = { ...p, ...payload };
      return updated;
    }
    return p;
  });
  if (updated) {
    logger.info('PresentesMock', `updatePresente(${id}): updated to title=${(updated as Presente).title}`);
  } else {
    logger.warn('PresentesMock', `updatePresente(${id}): presente not found`);
  }
  return updated;
};

export const deletePresente = async (id: string): Promise<boolean> => {
  await new Promise((r) => setTimeout(r, 100));
  const before = db.presentes.length;
  db.presentes = db.presentes.filter((p) => p.id !== id);
  const deleted = db.presentes.length < before;
  if (deleted) {
    logger.info('PresentesMock', `deletePresente(${id}): DELETED successfully ✓ DB now has ${db.presentes.length} presentes`);
  } else {
    logger.warn('PresentesMock', `deletePresente(${id}): presente not found`);
  }
  return deleted;
};

export const markAsPurchased = async (id: string, by: string, byType: 'self' | 'padrinho'): Promise<boolean> => {
  let ok = false;
  db.presentes = db.presentes.map((p) => {
    if (p.id === id && !p.purchasedBy) {
      ok = true;
      return { ...p, purchasedBy: by, purchasedByType: byType };
    }
    return p;
  });
  if (ok) {
    logger.info('PresentesMock', `markAsPurchased(${id}): marked as purchased by "${by}" (${byType})`);
  } else {
    logger.warn('PresentesMock', `markAsPurchased(${id}): already purchased or not found`);
  }
  return ok;
};

export default { listPresentes, getPresenteById, createPresente, updatePresente, deletePresente, markAsPurchased };
