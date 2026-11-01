import React from 'react';
import {
  Server,
  Database,
  Cpu,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  Code2,
} from 'lucide-react';
import type { HealthStatus } from '../types/health';
import type { ApiError } from '../types/api';

interface HealthPanelProps {
  health: HealthStatus | null;
  loading: boolean;
  error: ApiError | null;
  onRefresh: () => void;
}

export const HealthPanel: React.FC<HealthPanelProps> = ({ health, loading, error, onRefresh }) => {
  return (
    <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Live Backend Health-Check</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Endpoint: <code className="text-indigo-300 font-mono">GET /api/health</code>{' '}
            (Centralized diagnostics & database status)
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-lg text-sm font-medium transition cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Querying API...' : 'Refresh Health'}</span>
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
          <div className="text-sm">
            <p className="font-semibold text-rose-200">Backend Communication Issue</p>
            <p className="text-rose-300/90 mt-1 text-xs">{error.message}</p>
            <p className="text-rose-400/80 mt-2 text-xs">
              Make sure the backend NestJS service is running on{' '}
              <code className="font-mono bg-rose-950/80 px-1 py-0.5 rounded">
                http://localhost:3000
              </code>
              .
            </p>
          </div>
        </div>
      )}

      {health && !error && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Service Status */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                API Service
              </span>
              <div className="mt-2 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200 text-sm truncate">
                  {health.service}
                </span>
              </div>
              <span className="text-xs text-slate-400 block mt-1">
                v{health.version} • {health.environment}
              </span>
            </div>

            {/* PostgreSQL State */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Database (Prisma)
              </span>
              <div className="mt-2 flex items-center space-x-2">
                <Database
                  className={`w-4 h-4 ${health.database.status === 'connected' ? 'text-emerald-400' : 'text-amber-400'}`}
                />
                <span className="font-semibold text-slate-200 text-sm">
                  {health.database.provider.toUpperCase()}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    health.database.status === 'connected'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                      : 'bg-amber-950/80 text-amber-400 border border-amber-800/50'
                  }`}
                >
                  {health.database.status}
                </span>
              </div>
              <span
                className="text-xs text-slate-400 block mt-1 truncate"
                title={health.database.message}
              >
                {health.database.message}
              </span>
            </div>

            {/* Uptime */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Server Uptime
              </span>
              <div className="mt-2 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-slate-200 text-sm">
                  {health.uptimeSeconds}s
                </span>
              </div>
              <span className="text-xs text-slate-400 block mt-1 truncate">
                {new Date(health.timestamp).toLocaleTimeString()}
              </span>
            </div>

            {/* System Resources */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                Node Runtime
              </span>
              <div className="mt-2 flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-slate-200 text-sm">
                  {health.system.nodeVersion}
                </span>
              </div>
              <span className="text-xs text-slate-400 block mt-1">
                RSS: {health.system.memoryUsageMB} MB
              </span>
            </div>
          </div>

          {/* Raw Payload Inspection */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Diagnostic JSON Response (GET /api/health)</span>
            </div>
            <pre className="text-xs font-mono text-indigo-200/90 bg-slate-900/90 p-3 rounded overflow-x-auto border border-slate-800/80">
              {JSON.stringify(health, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </section>
  );
};
