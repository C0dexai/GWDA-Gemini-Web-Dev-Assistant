import React from 'react';

interface ReviewOutputProps {
    review: string;
}

const ReviewOutput = ({ review }: ReviewOutputProps): React.ReactNode => {
    if (!review) return null;

    const lines = review.split('\n');
    const elements: React.ReactNode[] = [];
    let isCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = '';

    lines.forEach((line, index) => {
        if (line.trim().startsWith('```')) {
            if (isCodeBlock) {
                // End of code block
                elements.push(
                    <div key={`code-wrapper-${index}`} className="my-4 rounded-md bg-black/25 backdrop-blur-sm border border-slate-700 overflow-hidden">
                        <div className="text-xs text-slate-400 bg-black/20 px-4 py-1">{codeBlockLang || 'code'}</div>
                        <pre className="p-4 font-mono text-sm overflow-x-auto">
                            <code>{codeBlockContent.join('\n')}</code>
                        </pre>
                    </div>
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
        <div className="mt-6 glass-card rounded-lg p-6 animate-fade-in">
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