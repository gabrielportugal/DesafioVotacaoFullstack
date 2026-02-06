import httpClient from '../infrastructure/http';
import type { VotingSessionRequest } from '../types/VotingSessionRequest';

export const votingSessionService = {
  async createVotingSession(request: VotingSessionRequest): Promise<void> {
    try {
      await httpClient.post('voting-session', request);
    } catch (error) {
      console.error('Erro ao criar sessão de votação:', error);
      throw error;
    }
  },
};
