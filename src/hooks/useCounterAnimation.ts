
import { useState, useEffect } from 'react';

interface UseCounterAnimationProps {
  end: number;
  duration?: number;
  delay?: number;
}

export const useCounterAnimation = ({ 
  end, 
  duration = 2000, 
  delay = 0 
}: UseCounterAnimationProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay]);

  return { count };
};
