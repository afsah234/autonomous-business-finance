import React from 'react';
import { ShieldCheck, Activity, Layers } from 'lucide-react';

interface NavbarProps {
  apiStatus: 'ok' | 'degraded' | 'error' | 'loading';
}

export const Navbar: React.FC<NavbarProps> = ({ apiStatus }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">
              Core Platform Architecture
            </span>
            <span className="text-sm font-bold text-slate-100 tracking-tight">
              ABFP Architecture v1.0
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-950/60 text-xs">
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Backend API:</span>
            <span
              className={`font-semibold inline-flex items-center gap-1.5 ${
                apiStatus === 'ok'
                  ? 'text-emerald-400'
                  : apiStatus === 'degraded'
                    ? 'text-amber-400'
                    : apiStatus === 'loading'
                      ? 'text-blue-400'
                      : 'text-rose-400'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  apiStatus === 'ok'
                    ? 'bg-emerald-500 animate-pulse'
                    : apiStatus === 'degraded'
                      ? 'bg-amber-500 animate-pulse'
                      : apiStatus === 'loading'
                        ? 'bg-blue-500 animate-ping'
                        : 'bg-rose-500'
                }`}
              />
              {apiStatus.toUpperCase()}
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-emerald-950 bg-emerald-950/30 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Phase 1 Initialized</span>
          </div>
        </div>
      </div>
    </header>
  );
};
