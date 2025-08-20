import React from 'react';
import { AI_FAMILY } from '../data/aiFamily';
import { AIPersona } from '../types';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';

const PersonaCard = ({ persona }: { persona: AIPersona }) => (
    <div className="glass-card rounded-lg p-6 h-full flex flex-col transition-transform transform hover:scale-105 hover:!border-cyan-500/50">
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-cyan-400">{persona.name}</h3>
            <p className="text-md text-slate-300 mb-3 font-semibold">{persona.role}</p>
            <p className="text-slate-400 text-sm mb-4 ">{persona.persona.description}</p>
            <p className="text-sm mb-4">
                <span className="font-semibold text-slate-300">Tone: </span>
                <span className="italic text-slate-400">{persona.persona.tone}</span>
            </p>
            <div>
                <h4 className="font-semibold text-slate-300 mb-2">Toolkit:</h4>
                <ul className="space-y-2">
                    {persona.superpowers.map((power, index) => (
                        <li key={index} className="flex items-start">
                            <WrenchScrewdriverIcon className="w-4 h-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-slate-400 text-sm">{power}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);


const AIFamily = (): React.ReactNode => {
    // We take only 5 personas to have a better layout
    const personasToShow = AI_FAMILY.slice(0, 5);
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-100 text-center mb-8">
                Meet Your AI Web Dev Team
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${personasToShow.length > 3 ? 3 : personasToShow.length} gap-8`}>
                {personasToShow.map((persona) => (
                    <PersonaCard key={persona.name} persona={persona} />
                ))}
            </div>
        </div>
    );
};

export default AIFamily;