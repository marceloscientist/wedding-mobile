import events from '../mocks/events';
import padrinhos from '../mocks/padrinhos';
import presentes from '../mocks/presentes';

export const EventAPI = {
  list: events.listEvents,
  get: events.getEvent,
  create: events.createEvent,
  update: events.updateEvent,
  delete: events.deleteEvent,
};

export const PadrinhoAPI = {
  list: padrinhos.listPadrinhos,
  get: padrinhos.getPadrinho,
  create: padrinhos.createPadrinho,
  delete: padrinhos.deletePadrinho,
};

export const PresentAPI = {
  list: presentes.listPresentes,
  reserve: presentes.reservePresente,
};

export default { EventAPI, PadrinhoAPI, PresentAPI };
