import React from 'react';
import { AI_FAMILY } from '../data/aiFamily';
import { AIPersona } from '../types';
import VueIcon from './icons/VueIcon';
import NodeJSIcon from './icons/NodeJSIcon';
import ViteIcon from './icons/ViteIcon';
import WorkflowIcon from './icons/WorkflowIcon';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';


const AgentCard = ({ agent }: { agent: AIPersona }) => (
    <div className="bg-black/25 backdrop-blur-sm border border-slate-700/80 rounded-lg p-4 mt-4 text-left shadow-inner">
        <h5 className="text-lg font-bold text-white">{agent.name}</h5>
        <p className="text-sm text-slate-300 mb-2 font-semibold">{agent.role}</p>
        <p className="text-xs text-slate-400 italic">{`"${agent.persona.description.split('.')[0]}."`}</p>
    </div>
);

const statusUpdates = [
    { id: 1, task: 'Vite HMR update', status: 'Completed', agent: 'Vito', timestamp: '2s ago' },
    { id: 2, task: 'GET /api/users', status: 'In Progress', agent: 'Nico', timestamp: '5s ago' },
    { id: 3, task: 'Component re-render', status: 'Completed', agent: 'Vee', timestamp: '8s ago' },
    { id: 4, task: 'DB query executed', status: 'Completed', agent: 'Nico', timestamp: '11s ago' },
];

const OrchestrationVisualizer = (): React.ReactNode => {
    const vee = AI_FAMILY.find(p => p.name === 'Vee');
    const nico = AI_FAMILY.find(p => p.name === 'Nico');

    return (
        <section className="animate-fade-in" aria-labelledby="orchestration-title">
            <div className="text-center">
                <h2 id="orchestration-title" className="text-3xl font-bold text-slate-100">Modern Full-Stack Workflow</h2>
                <p className="mt-2 text-lg text-slate-400 max-w-3xl mx-auto">
                    A live look at how our AI agents collaborate across a modern web stack, from the frontend to the backend.
                </p>
            </div>

            {/* Core Technologies */}
            <div className="mt-12 p-6 glass-card rounded-xl max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-slate-200 text-center mb-4">Core Technologies</h3>
                <div className="flex justify-center items-center gap-6 md:gap-10">
                    <div className="flex flex-col items-center gap-2">
                        <VueIcon className="w-10 h-10" />
                        <span className="text-sm font-bold text-slate-300">Vue.js</span>
                    </div>
                     <div className="flex flex-col items-center gap-2">
                        <ViteIcon className="w-10 h-10" />
                        <span className="text-sm font-bold text-slate-300">Vite</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <NodeJSIcon className="w-10 h-10" />
                        <span className="text-sm font-bold text-slate-300">Node.js</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <WrenchScrewdriverIcon className="w-10 h-10 text-yellow-400" />
                        <span className="text-sm font-bold text-slate-300">UI/UX</span>
                    </div>
                </div>
            </div>

            {/* Stack Interaction Flow */}
            <div className="mt-12 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8">
                {/* Frontend */}
                <div className="w-full md:w-5/12 lg:w-4/12 glass-card rounded-lg p-6 text-center">
                    <h4 className="text-2xl font-bold text-cyan-400 mb-2">Frontend</h4>
                    <p className="text-slate-400 mb-4 font-semibold">Client-Side (Vue)</p>
                    {vee && <AgentCard agent={vee} />}
                    <div className="mt-4 text-left">
                        <h6 className="font-semibold text-slate-300 text-sm mb-2">Active Component</h6>
                        <p className="text-xs text-slate-400 bg-slate-900 p-2 rounded truncate font-mono">UserProfile.vue</p>
                    </div>
                </div>
                
                {/* Connector */}
                <div className="flex flex-col items-center justify-center text-center">
                    <WorkflowIcon className="w-12 h-12 text-green-400 animate-pulse" />
                    <p className="font-mono text-sm text-green-400 mt-2">REST API</p>
                    <p className="text-xs text-slate-500">Async Fetch</p>
                </div>

                {/* Backend */}
                <div className="w-full md:w-5/12 lg:w-4/12 glass-card rounded-lg p-6 text-center">
                    <h4 className="text-2xl font-bold text-sky-400 mb-2">Backend</h4>
                    <p className="text-slate-400 mb-4 font-semibold">Server-Side (Node.js)</p>
                    {nico && <AgentCard agent={nico} />}
                     <div className="mt-4 text-left">
                        <h6 className="font-semibold text-slate-300 text-sm mb-2">Active Route</h6>
                        <p className="text-xs text-slate-400 bg-slate-900 p-2 rounded truncate font-mono">/api/users/:id</p>
                    </div>
                </div>
            </div>

            {/* Live Status Board */}
            <div className="mt-16 max-w-4xl mx-auto">
                 <h3 className="text-2xl font-bold text-slate-100 mb-6 text-center">Live Dev Server Status</h3>
                 <div className="glass-card rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-300">
                            <thead className="text-xs text-slate-400 uppercase bg-white/5">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Task</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Agent</th>
                                    <th scope="col" className="px-6 py-3">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statusUpdates.map((update) => (
                                    <tr key={update.id} className="border-b border-white/10 hover:bg-white/5">
                                        <td className="px-6 py-4 font-medium text-slate-200 font-mono">{update.task}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                                                update.status === 'Completed' ? 'bg-green-800 text-green-200' :
                                                update.status === 'In Progress' ? 'bg-yellow-800 text-yellow-200 animate-pulse' :
                                                'bg-slate-600 text-slate-200'
                                            }`}>
                                                {update.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-cyan-400">{update.agent}</td>
                                        <td className="px-6 py-4 text-slate-400">{update.timestamp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
        </section>
    );
};

export default OrchestrationVisualizer;