import { useState, useRef, useEffect } from 'react';

export const useHover = () => {
  const [value, setValue] = useState(false);

  const ref = useRef<any>(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);

        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value] as const;
};

export const useIsMovingLeftOrRight = () => {
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);

  // check if user is dragging left or right using mouse
  const handleMouseMove = (e: MouseEvent) => {
    if (e.movementX > 0) {
      setIsMovingRight(true);
      setIsMovingLeft(false);
    } else if (e.movementX < 0) {
      setIsMovingLeft(true);
      setIsMovingRight(false);
    }
  };

  // check if user is dragging left or right using touch
  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches[0].clientX > e.touches[0].clientY) {
      setIsMovingRight(true);
      setIsMovingLeft(false);
    } else if (e.touches[0].clientX < e.touches[0].clientY) {
      setIsMovingLeft(true);
      setIsMovingRight(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return [isMovingLeft, isMovingRight] as const;
};

export const useClickOutside = (ref: any, callback: any) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
};
