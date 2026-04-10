type Padrinho = { id: string; name: string; phone?: string; email?: string };

let DB: Padrinho[] = [
  { id: 'p1', name: 'Carlos Silva', phone: '99999-0001' },
  { id: 'p2', name: 'Mariana Rocha', phone: '99999-0002' },
];

export const listPadrinhos = async (): Promise<Padrinho[]> => {
  await new Promise((r) => setTimeout(r, 100));
  return [...DB];
};

export const getPadrinho = async (id: string): Promise<Padrinho | null> => {
  await new Promise((r) => setTimeout(r, 80));
  return DB.find((d) => d.id === id) ?? null;
};

export const createPadrinho = async (payload: Partial<Padrinho>): Promise<Padrinho> => {
  const item = { id: String(Date.now()), name: payload.name || 'Novo padrinho', phone: payload.phone } as Padrinho;
  DB = [item, ...DB];
  return item;
};

export const deletePadrinho = async (id: string): Promise<boolean> => {
  const before = DB.length;
  DB = DB.filter((d) => d.id !== id);
  return DB.length < before;
};

export default { listPadrinhos, getPadrinho, createPadrinho, deletePadrinho };
