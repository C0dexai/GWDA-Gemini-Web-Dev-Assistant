
import React from 'react';
import CodeIcon from './icons/CodeIcon';

const Header = (): React.ReactNode => {
  return (
    <header className="text-center p-6 border-b border-slate-700">
      <div className="flex items-center justify-center gap-4">
        <CodeIcon className="w-10 h-10 text-cyan-400" />
        <h1 className="text-4xl font-bold text-slate-100">
          Gemini Web Dev Assistant
        </h1>
      </div>
      <p className="mt-2 text-lg text-slate-400">
        AI-powered feedback for your Vue, Node, and full-stack projects.
      </p>
    </header>
  );
};

export default Header;