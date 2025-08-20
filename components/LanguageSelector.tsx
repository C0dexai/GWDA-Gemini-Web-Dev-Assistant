import React from 'react';
import { Language } from '../types';
import { PROGRAMMING_LANGUAGES } from '../constants';

interface LanguageSelectorProps {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageSelector = ({ language, setLanguage }: LanguageSelectorProps): React.ReactNode => {
  return (
    <div>
      <label htmlFor="language-select" className="block text-sm font-medium text-slate-300 mb-1">
        Language
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full bg-slate-900/60 border border-slate-700 backdrop-blur-sm rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
      >
        {PROGRAMMING_LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id} className="bg-slate-900">
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;