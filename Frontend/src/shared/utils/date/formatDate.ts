/**
 * Formata data ISO para formato brasileiro (DD/MM/YYYY)
 * @param isoDate - Data no formato ISO
 * @returns Data formatada ou string vazia se inválida
 */
export const formatDate = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch {
    return '';
  }
};
