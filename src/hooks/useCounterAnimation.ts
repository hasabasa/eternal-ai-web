
import { useState, useEffect } from 'react';

interface UseCounterAnimationOptions {
  end: number;
  duration?: number;
  delay?: number;
}

export const useCounterAnimation = ({ 
  end, 
  duration = 2000, 
  delay = 0 
}: UseCounterAnimationOptions) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      
      const steps = 60;
      const increment = end / steps;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const animate = () => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        
        setCount(Math.round(end * easeOutProgress));
        
        if (currentStep < steps) {
          setTimeout(animate, stepDuration);
        } else {
          setCount(end);
          setIsAnimating(false);
        }
      };
      
      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay]);

  return { count, isAnimating };
};
