import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quizAPI = {
  createSession: (userName, topicIds) => api.post('/sessions', { userName, topicIds }),
  submitAnswer: (sessionId, data) => api.post(`/sessions/${sessionId}/answers`, data),
  getLeaderboard: () => api.get('/leaderboard'),
  getTopics: () => api.get('/topics'),
};

export default api;
