import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service.js';

export interface HealthCheckResponse {
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

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async checkHealth(): Promise<HealthCheckResponse> {
    const isDbConnected = await this.prisma.isDatabaseHealthy();
    const environment = this.configService.get<string>(
      'app.nodeEnv',
      'development',
    );

    return {
      status: isDbConnected ? 'ok' : 'degraded',
      service: 'autonomous-business-finance-api',
      version: '1.0.0',
      environment,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      database: {
        status: isDbConnected ? 'connected' : 'disconnected',
        provider: 'postgresql',
        message: isDbConnected
          ? 'PostgreSQL connection verified via Prisma query execution'
          : 'PostgreSQL instance not reachable at configured DATABASE_URL (database offline or pending)',
      },
      system: {
        nodeVersion: process.version,
        memoryUsageMB: Math.round(process.memoryUsage().rss / (1024 * 1024)),
      },
    };
  }
}
