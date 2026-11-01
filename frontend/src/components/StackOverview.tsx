import React from 'react';
import { CheckCircle, Box, Server, Database, Settings } from 'lucide-react';

interface TechItem {
  name: string;
  detail: string;
  status: 'Ready' | 'Configured';
}

interface StackSection {
  title: string;
  icon: React.ReactNode;
  items: TechItem[];
}

export const StackOverview: React.FC = () => {
  const sections: StackSection[] = [
    {
      title: 'Frontend Tier',
      icon: <Box className="w-5 h-5 text-blue-400" />,
      items: [
        {
          name: 'React 19 & TypeScript',
          detail: 'Type-safe component architecture',
          status: 'Configured',
        },
        {
          name: 'Vite 8 Build Engine',
          detail: 'Instant HMR & optimized production bundling',
          status: 'Ready',
        },
        {
          name: 'Tailwind CSS v4',
          detail: 'Modern utility styling & dark-theme tokens',
          status: 'Configured',
        },
        {
          name: 'Responsive Layout',
          detail: 'Fluid breakpoints from mobile to 4K displays',
          status: 'Ready',
        },
      ],
    },
    {
      title: 'Backend Tier',
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      items: [
        {
          name: 'NestJS 12 Enterprise',
          detail: 'Modular IoC architecture & DI container',
          status: 'Configured',
        },
        {
          name: 'Node.js 24 Runtime',
          detail: 'High-performance V8 server environment',
          status: 'Ready',
        },
        {
          name: 'REST API Prefix (/api)',
          detail: 'Standardized route prefixing & CORS policies',
          status: 'Configured',
        },
        {
          name: 'Global Exception Filter',
          detail: 'Standardized error responses & logging',
          status: 'Ready',
        },
      ],
    },
    {
      title: 'Data & Persistence',
      icon: <Database className="w-5 h-5 text-amber-400" />,
      items: [
        {
          name: 'PostgreSQL Ready',
          detail: 'Configurable via DATABASE_URL env variable',
          status: 'Configured',
        },
        {
          name: 'Prisma ORM 6.4',
          detail: 'Type-safe database client & schema migrations',
          status: 'Ready',
        },
        {
          name: 'Declarative Models',
          detail: 'Initial system audit schema baseline',
          status: 'Ready',
        },
        {
          name: 'Resilient Pooling',
          detail: 'Graceful database connection handling',
          status: 'Configured',
        },
      ],
    },
    {
      title: 'Code Quality & Tooling',
      icon: <Settings className="w-5 h-5 text-purple-400" />,
      items: [
        {
          name: 'ESLint Flat Config',
          detail: 'Strict static code analysis across client & server',
          status: 'Ready',
        },
        {
          name: 'Prettier Formatter',
          detail: 'Deterministic code styling & indentation checks',
          status: 'Ready',
        },
        {
          name: 'Environment Hygiene',
          detail: 'Zero hardcoded secrets, .env.example templates',
          status: 'Configured',
        },
        {
          name: 'Git & GitHub Setup',
          detail: 'Granular .gitignore for secrets & build outputs',
          status: 'Ready',
        },
      ],
    },
  ];

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <span>Phase 1 Architecture Specifications</span>
        </h3>
        <p className="text-xs text-slate-400">
          All foundation layers configured with production-oriented separation of concerns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition"
          >
            <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-800">
              {section.icon}
              <h4 className="font-semibold text-slate-200 text-sm">{section.title}</h4>
            </div>

            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start space-x-2 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-200 block">{item.name}</span>
                    <span className="text-slate-400 text-[11px] block">{item.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
