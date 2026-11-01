import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HealthController } from './health.controller.js';
import { HealthService, HealthCheckResponse } from './health.service.js';

describe('HealthController', () => {
  let healthController: HealthController;
  let mockHealthService: Partial<HealthService>;

  beforeEach(() => {
    mockHealthService = {
      checkHealth: vi.fn().mockResolvedValue({
        status: 'ok',
        service: 'autonomous-business-finance-api',
        version: '1.0.0',
        environment: 'test',
        timestamp: new Date().toISOString(),
        uptimeSeconds: 42,
        database: {
          status: 'connected',
          provider: 'postgresql',
          message: 'PostgreSQL connection verified via Prisma query execution',
        },
        system: {
          nodeVersion: process.version,
          memoryUsageMB: 50,
        },
      } satisfies HealthCheckResponse),
    };

    healthController = new HealthController(mockHealthService as HealthService);
  });

  it('should return health check payload with status ok', async () => {
    const result = await healthController.getHealth();
    expect(result.status).toBe('ok');
    expect(result.service).toBe('autonomous-business-finance-api');
    expect(result.database.provider).toBe('postgresql');
    expect(result.database.status).toBe('connected');
  });
});
