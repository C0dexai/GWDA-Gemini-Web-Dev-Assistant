import React, { useState, useRef, useCallback, useMemo } from 'react';
import UploadIcon from './icons/UploadIcon';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  language: string;
}

const EXTENSION_TO_LANGUAGE: { [key: string]: string } = {
  'js': 'javascript',
  'jsx': 'javascript',
  'ts': 'typescript',
  'tsx': 'typescript',
  'py': 'python',
  'java': 'java',
  'cs': 'csharp',
  'go': 'go',
  'rs': 'rust',
  'cpp': 'cpp',
  'cxx': 'cpp',
  'h': 'cpp',
  'hpp': 'cpp',
  'rb': 'ruby',
  'php': 'php',
  'html': 'html',
  'htm': 'html',
  'css': 'css',
  'sql': 'sql',
  'vue': 'javascript', // Defaulting .vue to javascript for review
};

// Add Prism to window type for TypeScript
declare global {
    interface Window {
        Prism: {
            highlight: (text: string, grammar: any, language: string) => string;
            languages: { [key: string]: any };
        };
    }
}

const CodeInput = ({ code, setCode, setLanguage, language }: CodeInputProps): React.ReactNode => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);

        const extension = file.name.split('.').pop()?.toLowerCase() || '';
        if (extension && EXTENSION_TO_LANGUAGE[extension]) {
          setLanguage(EXTENSION_TO_LANGUAGE[extension]);
        }
      };
      reader.readAsText(file);
    }
  }, [setCode, setLanguage]);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const onAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleScroll = () => {
    if (preRef.current && textareaRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const highlightedCode = useMemo(() => {
    const lang = language && window.Prism?.languages[language] ? language : 'plaintext';
    if (typeof window !== 'undefined' && window.Prism) {
        // Append a newline to ensure the last line is rendered, which helps with scrolling synchronization.
        return window.Prism.highlight(code + '\n', window.Prism.languages[lang], lang);
    }
    // Basic HTML escaping as a fallback
    const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    return escaped + '\n';
  }, [code, language]);


  return (
    <div>
      <label htmlFor="code-input" className="block text-sm font-medium text-slate-300 mb-1">
        Your Code
      </label>
      <div 
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`relative w-full h-80 bg-slate-900/60 border border-slate-700 backdrop-blur-sm rounded-md shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500 overflow-hidden ${isDragging ? 'border-cyan-500 ring-2 ring-cyan-500' : ''}`}
      >
        <textarea
          ref={textareaRef}
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          placeholder="Paste your code here, or drop a file..."
          className="absolute inset-0 z-20 w-full h-full bg-transparent p-4 text-transparent caret-white font-mono text-sm focus:outline-none resize-none"
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
        <pre
            ref={preRef}
            className="absolute inset-0 z-10 w-full h-full p-4 font-mono text-sm overflow-auto pointer-events-none"
            aria-hidden="true"
        >
            <code
                className={`language-${language}`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
        </pre>
        <div 
          onClick={onAreaClick}
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-opacity duration-300 ${code ? 'opacity-0 pointer-events-none' : 'opacity-100'} bg-slate-900/40 hover:bg-slate-900/60 cursor-pointer`}
          role="button"
          aria-label="Upload or drop a code file"
        >
            <UploadIcon className="w-10 h-10 text-slate-400 mb-2" />
            <p className="text-slate-400">
                <span className="font-semibold text-cyan-400">Upload a file</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">.ts, .tsx, .js, .html, .css & more</p>
        </div>
        <input
            type="file"
            ref={fileInputRef}
            onChange={onFileSelect}
            className="hidden"
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cs,.go,.rs,.cpp,.cxx,.h,.hpp,.rb,.php,.html,.htm,.css,.sql,.vue"
        />
      </div>
    </div>
  );
};

export default CodeInput;