import type { Topic } from '../../../types/Topic';

/**
 * Ordena pautas colocando OPEN primeiro e CLOSED depois
 * Dentro de cada grupo, ordena por ID em ordem decrescente
 * @param topics - Array de pautas
 * @returns Array ordenado
 */
export const sortTopicsByStatus = (topics: Topic[]): Topic[] => {
  return [...topics].sort((a, b) => {
    // OPEN primeiro, CLOSED depois
    if (a.status === 'OPEN' && b.status === 'CLOSED') return -1;
    if (a.status === 'CLOSED' && b.status === 'OPEN') return 1;
    
    // Dentro do mesmo status, ordena por ID decrescente
    return b.id - a.id;
  });
};
