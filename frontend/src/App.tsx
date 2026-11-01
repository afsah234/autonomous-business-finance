import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HealthPanel } from './components/HealthPanel';
import { StackOverview } from './components/StackOverview';
import { fetchHealthStatus } from './services/healthApi';
import type { HealthStatus } from './types/health';
import type { ApiError } from './types/api';
import { Terminal, ShieldAlert, Cpu } from 'lucide-react';

export const App: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const loadHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHealthStatus();
      setHealth(data);
    } catch (err: unknown) {
      setError(err as ApiError);
      setHealth(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    fetchHealthStatus()
      .then((data) => {
        if (!isCancelled) {
          setHealth(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!isCancelled) {
          setError(err as ApiError);
          setHealth(null);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const apiStatus = loading ? 'loading' : error ? 'error' : health?.status || 'error';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar apiStatus={apiStatus} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner with required Title */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 p-8 sm:p-10 shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>Phase 1 — Environment & System Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Autonomous Business Finance Platform
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              Industrial-grade, browser-based financial operations architecture. Configured with
              full separation of concerns, end-to-end type safety, Prisma ORM data modeling, NestJS
              enterprise REST API, and modern Tailwind CSS.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                React 19 + TypeScript 5.8
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                NestJS 12 REST API
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                Prisma ORM + PostgreSQL
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                Tailwind CSS v4
              </span>
            </div>
          </div>

          <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* Live Diagnostics Card */}
        <HealthPanel health={health} loading={loading} error={error} onRefresh={loadHealth} />

        {/* Full Technology Stack Matrix */}
        <StackOverview />

        {/* Phase Boundary & Operating Guidelines */}
        <section className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6">
          <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-800 text-amber-400">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <h3 className="font-semibold text-slate-100 text-sm">Phase 1 Boundary Governance</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Per the initial phase specification, financial execution modules, AI agent integrations,
            and speculative business logic remain strictly uninstantiated. The current milestone is
            focused solely on environment scaffolding, type verification, health-check
            communications, and resilient architectural patterns.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>
                Runbook available in root{' '}
                <code className="text-slate-300 font-mono">README.md</code>
              </span>
            </div>
            <span>System Status: Initialized</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          Autonomous Business Finance Platform (ABFP) &copy; 2026. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
