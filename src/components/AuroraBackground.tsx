
import React from 'react';

const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/20 to-purple-100/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-pink-100/20 to-orange-100/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default AuroraBackground;
