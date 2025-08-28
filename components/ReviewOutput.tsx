import React, { useEffect, useState } from 'react';
import FormatIcon from './icons/FormatIcon';

// Let TypeScript know Prism and Prettier are available on the window object
declare global {
    interface Window {
        Prism: {
            highlightAll: () => void;
            highlight(text: string, grammar: any, language: string): string;
            languages: { [key: string]: any };
        };
        prettier: {
            format(source: string, options: any): Promise<string>;
        };
        prettierPlugins: {
            markdown: any;
            babel: any;
            typescript: any;
        };
    }
}

interface ReviewOutputProps {
    review: string;
}

const ReviewOutput = ({ review }: ReviewOutputProps): React.ReactNode => {
    const [displayedReview, setDisplayedReview] = useState(review);

    // When a new review prop comes in, reset the displayed content
    useEffect(() => {
        setDisplayedReview(review);
    }, [review]);
    
    // Highlight code blocks whenever the displayed content changes
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Prism) {
            window.Prism.highlightAll();
        }
    }, [displayedReview]);

    const handleFormat = async () => {
        if (typeof window.prettier === 'undefined' || typeof window.prettierPlugins === 'undefined') {
            console.error("Prettier is not loaded.");
            // In a real app, you might want to show a user-facing error.
            return;
        }
        try {
            const formatted = await window.prettier.format(review, {
                parser: "markdown",
                plugins: [
                    window.prettierPlugins.markdown,
                    window.prettierPlugins.babel,
                    window.prettierPlugins.typescript
                ],
                proseWrap: 'always',
                printWidth: 80,
            });
            setDisplayedReview(formatted);
        } catch (error) {
            console.error("Failed to format code with Prettier:", error);
            // Handle error, maybe show a message to the user.
        }
    };
    
    if (!displayedReview) return null;

    const lines = displayedReview.split('\n');
    const elements: React.ReactNode[] = [];
    let isCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';

    lines.forEach((line, index) => {
        if (line.trim().startsWith('```')) {
            if (isCodeBlock) {
                // End of code block
                elements.push(
                    <pre key={`code-${index}`} className="font-mono text-sm overflow-x-auto my-4">
                        <code className={`language-${codeBlockLang || 'plaintext'}`}>
                            {codeBlockContent.join('\n')}
                        </code>
                    </pre>
                );
                codeBlockContent = [];
                codeBlockLang = '';
            } else {
                codeBlockLang = line.trim().substring(3);
            }
            isCodeBlock = !isCodeBlock;
            return;
        }

        if (isCodeBlock) {
            codeBlockContent.push(line);
            return;
        }
        
        if (line.trim() === '' && !isCodeBlock && (elements.length === 0 || elements[elements.length - 1]?.['type'] !== 'div' )) {
             elements.push(<div key={`spacer-${index}`} className="h-3" />);
             return;
        }

        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('# ')) {
            elements.push(<h1 key={index} className="text-3xl font-bold mt-6 mb-3 pb-2 border-b border-slate-700 text-slate-100">{trimmedLine.substring(2)}</h1>);
        } else if (trimmedLine.startsWith('## ')) {
            elements.push(<h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-slate-200">{trimmedLine.substring(3)}</h2>);
        } else if (trimmedLine.startsWith('### ')) {
            elements.push(<h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-slate-300">{trimmedLine.substring(4)}</h3>);
        } else if (trimmedLine.startsWith('* ')) {
            const liContent = trimmedLine.substring(2);
             elements.push(
                <li key={index} className="ml-6 list-disc text-slate-300 my-1">
                    {parseInlineFormatting(liContent, `li-${index}`)}
                </li>
             );
        } else if (trimmedLine) {
            elements.push(
                <p key={index} className="my-2 text-slate-300 leading-relaxed">
                    {parseInlineFormatting(line, `p-${index}`)}
                </p>
            );
        }
    });

    return (
        <div className="relative mt-6 glass-card rounded-lg p-6 animate-fade-in">
             <button
                onClick={handleFormat}
                className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white font-medium py-1.5 px-3 rounded-md transition-all text-xs border border-slate-600/50"
                title="Format with Prettier"
                aria-label="Format code with Prettier"
            >
                <FormatIcon className="w-4 h-4" />
                <span>Format Code</span>
            </button>
            {elements}
        </div>
    );
};

const parseInlineFormatting = (text: string, parentKey: string): React.ReactNode => {
    const parts = text.split(/(\`.*?\`|\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        const key = `${parentKey}-part-${i}`;
        if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={key} className="bg-slate-900/50 text-pink-400 rounded px-1.5 py-1 font-mono text-sm mx-0.5">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={key} className="font-bold text-slate-200">{part.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={key}>{part}</React.Fragment>;
    });
}


export default ReviewOutput;