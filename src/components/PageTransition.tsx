
import React, { useState, useEffect } from 'react';

interface PageTransitionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  titleDelay?: number;
  contentDelay?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  title,
  subtitle,
  children,
  titleDelay = 100,
  contentDelay = 800
}) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, titleDelay);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, contentDelay);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(contentTimer);
    };
  }, [titleDelay, contentDelay]);

  return (
    <div className="relative w-full h-full">
      {/* Full-screen title overlay */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white/95 to-brand-orange/5 backdrop-blur-sm transition-all duration-1000 ${
        showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className={`text-center transition-all duration-800 ${
          showTitle ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}>
          <h1 className="text-4xl lg:text-6xl font-bold text-brand-darkBlue mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-1000 delay-200 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
