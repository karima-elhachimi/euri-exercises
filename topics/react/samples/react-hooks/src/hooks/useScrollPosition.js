import { useState, useEffect } from 'react';

export function useScrollPosition() {
  let [position, setPosition] = useState(0);
  useEffect(() => {
    function handleScroll() {
      setPosition(window.pageYOffset);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return position;
}
