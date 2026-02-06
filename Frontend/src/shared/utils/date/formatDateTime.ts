/**
 * Formata data ISO para formato brasileiro com hora (DD/MM/YYYY HH:mm)
 * @param isoDate - Data no formato ISO
 * @returns Data e hora formatadas ou string vazia se inválida
 */
export const formatDateTime = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch {
    return '';
  }
};
