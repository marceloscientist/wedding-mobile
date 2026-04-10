type EventItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  guests?: number;
  description?: string;
};

let DB: EventItem[] = [
  { id: '1', title: 'Casamento: Ana & João', date: '2026-05-15', location: 'Igreja Matriz', guests: 120, description: 'Celebração na igreja seguida de recepção.' },
  { id: '2', title: 'Chá de bebê: Marina', date: '2026-06-02', location: 'Espaço Aurora', guests: 45, description: 'Chá de bebê com amiguinhas e família.' },
  { id: '3', title: 'Aniversário: Lucas', date: '2026-08-21', location: 'Casa do Lucas', guests: 60, description: 'Festa infantil com tema de super-heróis.' },
];

export const listEvents = async (): Promise<EventItem[]> => {
  // simulate small delay
  await new Promise((r) => setTimeout(r, 120));
  return [...DB];
};

export const getEvent = async (id: string): Promise<EventItem | null> => {
  await new Promise((r) => setTimeout(r, 80));
  return DB.find((d) => d.id === id) ?? null;
};

export const createEvent = async (payload: Partial<EventItem>): Promise<EventItem> => {
  const newItem: EventItem = { id: String(Date.now()), title: payload.title || 'Novo evento', date: payload.date || '', location: payload.location, guests: payload.guests || 0, description: payload.description };
  DB = [newItem, ...DB];
  return newItem;
};

export const updateEvent = async (id: string, payload: Partial<EventItem>): Promise<EventItem | null> => {
  let updated: EventItem | null = null;
  DB = DB.map((d) => {
    if (d.id === id) {
      updated = { ...d, ...payload };
      return updated;
    }
    return d;
  });
  return updated;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  const before = DB.length;
  DB = DB.filter((d) => d.id !== id);
  return DB.length < before;
};

export default { listEvents, getEvent, createEvent, updateEvent, deleteEvent };
