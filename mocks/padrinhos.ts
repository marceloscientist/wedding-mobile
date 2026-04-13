import { logger } from '../utils/logger';
import { db } from './database';

export const listPadrinhos = async () => {
  await new Promise((r) => setTimeout(r, 100));
  const result = [...db.padrinhos];
  logger.debug('PadrinhosMock', `listPadrinhos: returning ${result.length} padrinhos`);
  return result;
};

export const getPadrinho = async (id: string) => {
  await new Promise((r) => setTimeout(r, 80));
  const result = db.padrinhos.find((d) => d.id === id) ?? null;
  logger.debug('PadrinhosMock', `getPadrinho(${id}): found = ${result ? 'yes' : 'no'}`);
  return result;
};

export const createPadrinho = async (payload: any) => {
  const item = { id: String(Date.now()), name: payload.name || 'Novo padrinho', phone: payload.phone };
  db.padrinhos = [item, ...db.padrinhos];
  logger.info('PadrinhosMock', `createPadrinho: created new padrinho with id=${item.id}, name=${item.name}, phone=${item.phone || 'none'}`);
  logger.debug('PadrinhosMock', `DB now has ${db.padrinhos.length} padrinhos`);
  return item;
};

export const updatePadrinho = async (id: string, payload: any) => {
  let updated = null;
  db.padrinhos = db.padrinhos.map((d) => {
    if (d.id === id) {
      updated = { ...d, ...payload };
      return updated;
    }
    return d;
  });
  if (updated) {
    logger.info('PadrinhosMock', `updatePadrinho(${id}): updated to name=${(updated as any).name}`);
  } else {
    logger.warn('PadrinhosMock', `updatePadrinho(${id}): padrinho not found`);
  }
  return updated;
};

export const deletePadrinho = async (id: string) => {
  await new Promise((r) => setTimeout(r, 100));
  const before = db.padrinhos.length;
  db.padrinhos = db.padrinhos.filter((d) => d.id !== id);
  const deleted = db.padrinhos.length < before;
  if (deleted) {
    logger.info('PadrinhosMock', `deletePadrinho(${id}): DELETED successfully ✓ DB now has ${db.padrinhos.length} padrinhos`);
  } else {
    logger.warn('PadrinhosMock', `deletePadrinho(${id}): padrinho not found`);
  }
  return deleted;
};

export default { listPadrinhos, getPadrinho, createPadrinho, updatePadrinho, deletePadrinho };
