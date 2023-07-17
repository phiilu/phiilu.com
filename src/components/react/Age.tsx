import { useEffect, useState } from 'react';

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

  return <strong aria-live="polite">{age}</strong>;
}
