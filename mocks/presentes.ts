type Presente = { id: string; title: string; reservedBy?: string | null };

let DB: Presente[] = [
  { id: 'pr1', title: 'Conjunto de toalhas', reservedBy: null },
  { id: 'pr2', title: 'Jogo de panelas', reservedBy: 'Carlos Silva' },
];

export const listPresentes = async (): Promise<Presente[]> => {
  await new Promise((r) => setTimeout(r, 80));
  return [...DB];
};

export const reservePresente = async (id: string, by: string): Promise<boolean> => {
  let ok = false;
  DB = DB.map((p) => {
    if (p.id === id && !p.reservedBy) {
      ok = true;
      return { ...p, reservedBy: by };
    }
    return p;
  });
  return ok;
};

export default { listPresentes, reservePresente };
