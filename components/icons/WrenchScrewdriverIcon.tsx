import React from 'react';

const WrenchScrewdriverIcon = ({ className }: { className?: string }): React.ReactNode => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}>
    <path 
        fillRule="evenodd" 
        d="M12.234 3.986a.75.75 0 01.755.023l7.5 5.25a.75.75 0 01-.023 1.289l-7.5 5.25a.75.75 0 01-.732-1.266l6.45-4.515-6.45-4.515a.75.75 0 01-.023-.755zm-2.468 0a.75.75 0 01.732 1.266l-6.45 4.515 6.45 4.515a.75.75 0 01-.023 1.289l-7.5-5.25a.75.75 0 01-.023-1.289l7.5-5.25a.75.75 0 01.755-.023z" 
        clipRule="evenodd" 
    />
    <path 
        d="M5.25 15.326a2.625 2.625 0 100 5.25 2.625 2.625 0 000-5.25zm0 3.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM18.75 15.326a2.625 2.625 0 100 5.25 2.625 2.625 0 000-5.25zm0 3.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" 
    />
</svg>
);

export default WrenchScrewdriverIcon;
