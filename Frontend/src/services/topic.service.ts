import httpClient from '../infrastructure/http';
import type { Topic, TopicWithSessions } from '../types/Topic';
import type { VoteResult } from '../types/VoteResult';

export const topicService = {
  async getAllTopics(): Promise<Topic[]> {
    try {
      const response = await httpClient.get<Topic[]>('/topic');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pautas:', error);
      throw error;
    }
  },

  async getTopicById(id: number): Promise<TopicWithSessions> {
    try {
      const response = await httpClient.get<TopicWithSessions>(`/topic/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar pauta ${id}:`, error);
      throw error;
    }
  },

  async createTopic(data: Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>): Promise<Topic> {
    try {
      const response = await httpClient.post<Topic>('/topic', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar pauta:', error);
      throw error;
    }
  },

  async deleteTopic(id: number): Promise<void> {
    try {
      await httpClient.delete(`/topic/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar pauta ${id}:`, error);
      throw error;
    }
  },

  async getTopicResult(id: number): Promise<VoteResult> {
    try {
      const response = await httpClient.get<VoteResult>(`/topic/result/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar resultado da pauta ${id}:`, error);
      throw error;
    }
  },
};
