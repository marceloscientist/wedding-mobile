/**
 * Converte data ISO (YYYY-MM-DD) para formato brasileiro (DD/MM/YYYY)
 */
export function formatDateToBR(iso: string): string {
  if (!iso) return '';
  try {
    const date = new Date(iso + 'T00:00:00Z');
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  } catch {
    return iso;
  }
}

/**
 * Converte formato brasileiro (DD/MM/YYYY) para ISO (YYYY-MM-DD)
 */
export function formatDateFromBR(br: string): string {
  if (!br) return '';
  try {
    const [day, month, year] = br.split('/');
    return `${year}-${month}-${day}`;
  } catch {
    return br;
  }
}

/**
 * Retorna data atual no formato ISO (YYYY-MM-DD)
 */
export function getTodayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default { formatDateToBR, formatDateFromBR, getTodayISO };
