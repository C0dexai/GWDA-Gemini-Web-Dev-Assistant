import React, { useState } from 'react';

interface IconProps {
  className?: string;
}

interface Tab {
  label: string;
  icon: React.ReactElement<IconProps>;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps): React.ReactNode => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="w-full">
      <div className="border-b border-slate-700">
        <nav className="-mb-px flex space-x-4 md:space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTabIndex(index)}
              className={`${
                index === activeTabIndex
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
              } flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-offset-slate-900 focus:ring-2 focus:ring-cyan-500 rounded-t-sm`}
              aria-current={index === activeTabIndex ? 'page' : undefined}
            >
              {React.cloneElement(tab.icon, { className: 'w-5 h-5' })}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {tabs.map((tab, index) => (
            <div key={tab.label} className={index === activeTabIndex ? 'block' : 'hidden'}>
                {tab.content}
            </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;