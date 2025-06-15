
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

  const totalSlides = children.length;

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

  // Mouse wheel navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      tabIndex={0}
    >
      {/* Slides container */}
      <div 
        className="h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full"
            style={{ minHeight: '100vh' }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="fixed top-8 right-8 z-[9999]">
        <Button
          onClick={goToPrev}
          className="w-14 h-14 bg-brand-orange/90 hover:bg-brand-orange text-white border-none shadow-xl hover:shadow-2xl transition-all hover:scale-110"
          size="icon"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="fixed bottom-8 right-8 z-[9999]">
        <Button
          onClick={goToNext}
          className="w-14 h-14 bg-brand-orange/90 hover:bg-brand-orange text-white border-none shadow-xl hover:shadow-2xl transition-all hover:scale-110"
          size="icon"
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>

      {/* Slide indicators */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-[9999] flex flex-col space-y-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-8 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "bg-brand-orange" 
                : "bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;
