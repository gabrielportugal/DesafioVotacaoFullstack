export type TopicStatus = 'OPEN' | 'CLOSED';
export type VotingSessionStatus = 'OPEN' | 'CLOSED';

export interface VotingSession {
  createdAt: string;
  closedAt?: string;
  duration: number;
  status: VotingSessionStatus;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  status: TopicStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TopicWithSessions {
  topicId: number;
  title: string;
  description: string;
  status: TopicStatus;
  votingSessions: VotingSession[];
}

export interface TopicListResponse {
  data: Topic[];
  total?: number;
}
