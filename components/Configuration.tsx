import React, { useState } from 'react';
import InfoIcon from './icons/InfoIcon';
import EyeIcon from './icons/EyeIcon';
import EyeSlashIcon from './icons/EyeSlashIcon';

interface ConfigurationProps {
    apiKey: string;
    setApiKey: (key: string) => void;
}

const Configuration = ({ apiKey, setApiKey }: ConfigurationProps): React.ReactNode => {
    const [showApiKey, setShowApiKey] = useState(false);

    return (
        <div className="animate-fade-in max-w-2xl mx-auto">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-100">Environment Configuration</h2>
                <p className="mt-2 text-lg text-slate-400">
                    This section demonstrates how environment variables are handled securely.
                </p>
            </div>

            <div className="mt-8 space-y-6">
                <div className="glass-card rounded-lg p-6">
                    <div>
                        <label htmlFor="api-name" className="block text-sm font-medium text-slate-300 mb-1">
                            API Name (Example)
                        </label>
                        <input
                            type="text"
                            id="api-name"
                            value="Gemini API"
                            disabled
                            className="w-full bg-slate-900/60 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-slate-400 cursor-not-allowed focus:outline-none"
                        />
                        <p className="mt-2 text-xs text-slate-500">
                            This is an example of a non-sensitive configuration value.
                        </p>
                    </div>
                </div>

                <div className="glass-card rounded-lg p-6">
                     <div>
                        <label htmlFor="api-key-input" className="block text-sm font-medium text-slate-300 mb-1">
                            API Key
                        </label>
                        <div className="relative">
                            <input
                                type={showApiKey ? 'text' : 'password'}
                                id="api-key-input"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="Enter your Gemini API Key..."
                                className="w-full bg-slate-900/60 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 pr-10"
                                autoComplete="off"
                            />
                            <button
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-cyan-400 transition-colors"
                                aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                            >
                                {showApiKey ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        <div className="mt-3 flex items-start gap-2 bg-sky-900/30 border border-sky-400/20 text-sky-200 px-3 py-2 rounded-lg text-sm">
                            <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0 text-sky-400" />
                            <span>
                                <strong className="font-semibold">Security Notice:</strong> For production applications, always use environment variables on a secure server to store API keys. The key you enter here is stored only in your browser's memory for this session and is not persisted.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuration;
