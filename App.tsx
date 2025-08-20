import React from 'react';
import { useState, useCallback, useRef } from 'react';
import { PROGRAMMING_LANGUAGES } from './constants';
import { reviewCode } from './services/geminiService';

import LanguageSelector from './components/LanguageSelector';
import CodeInput from './components/CodeInput';
import Loader from './components/Loader';
import ReviewOutput from './components/ReviewOutput';
import SparklesIcon from './components/icons/SparklesIcon';
import AIFamily from './components/AIFamily';
import OrchestrationVisualizer from './components/OrchestrationVisualizer';
import Tabs from './components/Tabs';
import CodeIcon from './components/icons/CodeIcon';
import UsersIcon from './components/icons/UsersIcon';
import WorkflowIcon from './components/icons/WorkflowIcon';
import Configuration from './components/Configuration';
import CogIcon from './components/icons/CogIcon';

const App = (): React.ReactNode => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(PROGRAMMING_LANGUAGES[0].id);
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const mainContentRef = useRef<HTMLElement>(null);

  const handleGetStartedClick = () => {
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReview = useCallback(async () => {
    if (!code) {
      setError('Please enter some code to review.');
      return;
    }
    setError('');
    setReview('');
    setIsLoading(true);

    try {
      const result = await reviewCode(code, language);
      setReview(result);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  const tabs = [
    {
        label: 'Code Review',
        icon: <CodeIcon />,
        content: (
            <div className="max-w-4xl mx-auto">
                <div className="glass-card rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                        <CodeInput code={code} setCode={setCode} setLanguage={setLanguage} />
                        </div>
                        <LanguageSelector language={language} setLanguage={setLanguage} />
                    </div>
                    
                    <div className="pt-4 border-t border-slate-700/50">
                        <button
                        onClick={handleReview}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
                        >
                        {isLoading ? (
                            <span>Analyzing...</span>
                        ) : (
                            <>
                            <SparklesIcon className="w-5 h-5" />
                            Review My Code
                            </>
                        )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-6 bg-red-500/10 backdrop-blur-sm border border-red-400/20 text-red-200 px-4 py-3 rounded-lg" role="alert">
                        <strong className="font-bold">Oops! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {isLoading && <Loader />}
                
                {review && <ReviewOutput review={review} />}

                {!isLoading && !review && !error && (
                    <div className="mt-8 text-center text-slate-400">
                        <p className="animate-pulse">Your AI web development assistant is ready. Paste your code to get started!</p>
                    </div>
                )}
            </div>
        )
    },
    {
        label: 'AI Dev Team',
        icon: <UsersIcon />,
        content: <AIFamily />
    },
    {
        label: 'Stack Workflow',
        icon: <WorkflowIcon />,
        content: <OrchestrationVisualizer />
    },
    {
        label: 'Configuration',
        icon: <CogIcon />,
        content: <Configuration />
    }
  ];

  return (
    <div className="text-white">
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="z-10 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-100" style={{textShadow: '0 0 15px rgba(74, 222, 231, 0.5)'}}>
            Gemini Web Dev Assistant
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Your AI-powered co-pilot for modern web development. Get instant code reviews, explore an AI dev team, and visualize your stack's workflow.
          </p>
          <button
            onClick={handleGetStartedClick}
            className="mt-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg shadow-cyan-500/20"
          >
            Get Started
          </button>
        </div>
      </header>
      
      {/* Main App Content */}
      <main ref={mainContentRef} id="main-content" className="relative pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8">
                <Tabs tabs={tabs} />
            </div>
        </div>
      </main>

      <footer className="text-center p-4 text-slate-500 text-sm relative">
        Powered by Google Gemini.
      </footer>
    </div>
  );
};

export default App;