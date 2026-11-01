export interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  service: string;
  version: string;
  environment: string;
  timestamp: string;
  uptimeSeconds: number;
  database: {
    status: 'connected' | 'disconnected';
    provider: string;
    message: string;
  };
  system: {
    nodeVersion: string;
    memoryUsageMB: number;
  };
}
