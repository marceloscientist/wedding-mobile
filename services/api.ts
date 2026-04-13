import events from '../mocks/events';
import padrinhos from '../mocks/padrinhos';
import presentes from '../mocks/presentes';
import { logger } from '../utils/logger';

export const EventAPI = {
  list: async () => {
    logger.debug('EventAPI', 'list() called');
    return events.listEvents();
  },
  get: async (id: string) => {
    logger.debug('EventAPI', `get(${id}) called`);
    return events.getEvent(id);
  },
  create: async (payload: any) => {
    logger.debug('EventAPI', `create() called`, { title: payload.title });
    return events.createEvent(payload);
  },
  update: async (id: string, payload: any) => {
    logger.debug('EventAPI', `update(${id}) called`);
    return events.updateEvent(id, payload);
  },
  delete: async (id: string) => {
    logger.debug('EventAPI', `delete(${id}) called`);
    return events.deleteEvent(id);
  },
};

export const PadrinhoAPI = {
  list: async () => {
    logger.debug('PadrinhoAPI', 'list() called');
    return padrinhos.listPadrinhos();
  },
  get: async (id: string) => {
    logger.debug('PadrinhoAPI', `get(${id}) called`);
    return padrinhos.getPadrinho(id);
  },
  create: async (payload: any) => {
    logger.debug('PadrinhoAPI', `create() called`, { name: payload.name });
    return padrinhos.createPadrinho(payload);
  },
  update: async (id: string, payload: any) => {
    logger.debug('PadrinhoAPI', `update(${id}) called`);
    return padrinhos.updatePadrinho(id, payload);
  },
  delete: async (id: string) => {
    logger.debug('PadrinhoAPI', `delete(${id}) called`);
    return padrinhos.deletePadrinho(id);
  },
};

export const PresentAPI = {
  list: async () => {
    logger.debug('PresentAPI', 'list() called');
    return presentes.listPresentes();
  },
  get: async (id: string) => {
    logger.debug('PresentAPI', `get(${id}) called`);
    return presentes.getPresenteById(id);
  },
  create: async (payload: any) => {
    logger.debug('PresentAPI', `create() called`, { title: payload.title });
    return presentes.createPresente(payload);
  },
  update: async (id: string, payload: any) => {
    logger.debug('PresentAPI', `update(${id}) called`);
    return presentes.updatePresente(id, payload);
  },
  delete: async (id: string) => {
    logger.debug('PresentAPI', `delete(${id}) called`);
    return presentes.deletePresente(id);
  },
  markAsPurchased: async (id: string, by: string, byType: 'self' | 'padrinho') => {
    logger.debug('PresentAPI', `markAsPurchased(${id}, "${by}", "${byType}") called`);
    return presentes.markAsPurchased(id, by, byType);
  },
};

export default { EventAPI, PadrinhoAPI, PresentAPI };
