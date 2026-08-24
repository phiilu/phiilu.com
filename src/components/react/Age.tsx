import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useReduceMotion } from '@/hooks/useReduceMotion';

interface AgeProps {
  age: number; // in milliseconds
}

export function Age({ age: ageFromProps }: AgeProps) {
  const [age, setAge] = useState(() => ageFromProps);
  useEffect(() => {
    const interval = setInterval(() => {
      setAge((age) => age + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const reduceMotion = useReduceMotion();
  // Reduced motion keeps the crossfade but drops the vertical travel.
  const shift = reduceMotion ? '0em' : '0.4em';
  const digits = age.toLocaleString('de-DE').split('');

  return (
    <strong className="inline-flex tabular-nums">
      <span className="sr-only" aria-live="polite">
        {age}
      </span>
      <span aria-hidden="true" className="inline-flex">
        {digits.map((digit, index) => (
          // Key from the right so digits keep their slot when the number grows.
          <span key={digits.length - index} className="relative inline-block">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={digit}
                className="inline-block"
                initial={{ y: `-${shift}`, opacity: 0 }}
                animate={{ y: '0em', opacity: 1 }}
                exit={{ y: shift, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </span>
        ))}
      </span>
    </strong>
  );
}
