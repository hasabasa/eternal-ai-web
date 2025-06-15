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
    console.log('SimpleCarousel: Going to next slide');
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrev = () => {
    console.log('SimpleCarousel: Going to previous slide');
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
      console.log('SimpleCarousel: Wheel event processed');

      if (event.deltaY > 0) {
        goToNext();
      } else {
        goToPrev();
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 300);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isMobile]);

  // Touch navigation for mobile with swipe gestures
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMobile) return;

    let startY = 0;
    let endY = 0;
    let startTime = 0;

    const handleTouchStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchMove = (event: TouchEvent) => {
      // Allow normal scrolling within sections on mobile
      const target = event.target as HTMLElement;
      const section = target.closest('.carousel-section');
      if (section) {
        const isScrollable = section.scrollHeight > section.clientHeight;
        if (isScrollable) {
          return; // Allow normal scroll
        }
      }
      event.preventDefault();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      endY = event.changedTouches[0].clientY;
      const deltaY = startY - endY;
      const deltaTime = Date.now() - startTime;

      // Require minimum swipe distance and reasonable speed
      if (Math.abs(deltaY) > 80 && deltaTime < 500) {
        if (deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      tabIndex={0}
    >
      {/* Slides container with smooth transitions */}
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
            className={cn(
              "flex-shrink-0 w-full h-full carousel-section",
              isMobile ? "overflow-y-auto" : "overflow-hidden"
            )}
            style={{ minHeight: '100vh' }}
          >
            <div className="animate-section-entrance">
              {child}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons - адаптивные размеры */}
      <div className="fixed top-4 sm:top-6 md:top-8 left-1 sm:left-2 z-[9999]">
        <Button
          onClick={goToPrev}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-brand-orange/90 hover:bg-brand-orange text-white border-none shadow-xl hover:shadow-2xl transition-all hover:scale-110 animate-icon-bounce"
          size="icon"
        >
          <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </Button>
      </div>
      
      <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-1 sm:left-2 z-[9999]">
        <Button
          onClick={goToNext}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-brand-orange/90 hover:bg-brand-orange text-white border-none shadow-xl hover:shadow-2xl transition-all hover:scale-110 animate-icon-bounce"
          size="icon"
        >
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
        </Button>
      </div>

      {/* Slide indicators - адаптивные размеры */}
      <div className="fixed left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-[9999] flex flex-col space-y-1 sm:space-y-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-1 h-4 sm:w-1.5 sm:h-6 md:w-2 md:h-8 rounded-full transition-all duration-500 animate-icon-bounce",
              index === currentIndex 
                ? "bg-brand-orange scale-110" 
                : "bg-white/50 hover:bg-white/70"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>

      {/* Mobile swipe hint */}
      {isMobile && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-[9999] text-white/70 text-xs text-center animate-text-reveal">
          <div className="bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            Свайп вверх/вниз для навигации
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleCarousel;