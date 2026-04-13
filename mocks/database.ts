/**
 * Persistent in-memory database for mock mode
 * Maintains state across screen navigation during the session
 * Resets only on full app reload
 */

export type EventItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  guests?: number;
  description?: string;
};

export type Padrinho = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
};

export type Presente = {
  id: string;
  title: string;
  purchasedBy?: string | null;
  purchasedByType?: 'self' | 'padrinho' | null;
};

// Single source of truth - never reset during session
class PersistentDatabase {
  private static instance: PersistentDatabase;

  events: EventItem[] = [
    { id: '1', title: 'Casamento: Ana & João', date: '2026-05-15', location: 'Igreja Matriz', guests: 120, description: 'Celebração na igreja seguida de recepção.' },
    { id: '2', title: 'Chá de bebê: Marina', date: '2026-06-02', location: 'Espaço Aurora', guests: 45, description: 'Chá de bebê com amiguinhas e família.' },
    { id: '3', title: 'Aniversário: Lucas', date: '2026-08-21', location: 'Casa do Lucas', guests: 60, description: 'Festa infantil com tema de super-heróis.' },
  ];

  padrinhos: Padrinho[] = [
    { id: 'p1', name: 'Carlos Silva', phone: '99999-0001' },
    { id: 'p2', name: 'Mariana Rocha', phone: '99999-0002' },
  ];

  presentes: Presente[] = [
    { id: 'pr1', title: 'Conjunto de toalhas', purchasedBy: null, purchasedByType: null },
    { id: 'pr2', title: 'Jogo de panelas', purchasedBy: 'Carlos Silva', purchasedByType: 'padrinho' },
  ];

  private constructor() {}

  static getInstance(): PersistentDatabase {
    if (!PersistentDatabase.instance) {
      PersistentDatabase.instance = new PersistentDatabase();
    }
    return PersistentDatabase.instance;
  }
}

export const db = PersistentDatabase.getInstance();
