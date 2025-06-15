import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SimpleCarouselProps {
  children: React.ReactNode[];
  className?: string;
}

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({ children, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const totalSlides = children.length;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        goToPrev();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Desktop mouse wheel navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      
      if (isScrolling.current) return;
      
      isScrolling.current = true;

      if (event.deltaY > 0) {
        goToNext();
      } else {
        goToPrev();
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isMobile]);

  // Touch navigation for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMobile) return;

    let startY = 0;
    let endY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      endY = event.changedTouches[0].clientY;
      const deltaY = startY - endY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      tabIndex={0}
    >
      {/* Slides container */}
      <div 
        className="h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full"
            style={{ minHeight: '100vh' }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="fixed top-4 left-2 z-[9999]">
        <Button
          onClick={goToPrev}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-orange/90 hover:bg-brand-orange text-white border-none shadow-xl hover:shadow-2xl transition-all hover:scale-110"
          size="icon"
        >
          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
      
      <div className="fixed bottom-4 left-2 z-[9999]">
        <Button
          onClick={goToNext}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-orange/90 hover:bg-brand-orange text-white border-none shadow-xl hover:shadow-2xl transition-all hover:scale-110"
          size="icon"
        >
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Slide indicators */}
      <div className="fixed left-16 sm:left-20 top-1/2 transform -translate-y-1/2 z-[9999] flex flex-col space-y-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-6 sm:w-2 sm:h-8 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "bg-brand-orange" 
                : "bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* Mobile swipe hint */}
      {isMobile && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-[9999] text-white/70 text-xs text-center">
          <div className="bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            Свайп вверх/вниз для навигации
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleCarousel;