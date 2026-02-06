export type VoteChoice = 'Sim' | 'Não';

export interface VoteRequest {
  topicId: number;
  associateId: string;
  choice: VoteChoice;
}

export interface VoteResponse {
  id?: number;
  topicId: number;
  associateId: string;
  choice: VoteChoice;
  votedAt?: string;
}
