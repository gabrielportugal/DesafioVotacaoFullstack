import { HttpClient } from './HttpClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const httpClient = new HttpClient({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Exporta o cliente configurado
export default httpClient;
