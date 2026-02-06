import httpClient from '../infrastructure/http';
import type { VoteRequest, VoteResponse } from '../types/Vote';

export const voteService = {
  async submitVote(voteData: VoteRequest): Promise<VoteResponse> {
    try {
      const response = await httpClient.post<VoteResponse>('/votes', voteData);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar voto:', error);
      throw error;
    }
  },
};
