import { apiClient } from './apiClient';
import type { HealthStatus } from '../types/health';

export const fetchHealthStatus = async (): Promise<HealthStatus> => {
  return apiClient.get<HealthStatus>('/api/health');
};
