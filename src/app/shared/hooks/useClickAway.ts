'use client';
import { RefObject, useEffect, useRef } from 'react';

export function useClickAway(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: MouseEvent) => void,
) {
  const savedCallback = useRef(onClickAway);

  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const { current } = ref;

      if (current && !current.contains(e.target as Node)) {
        savedCallback.current(e);
      }
    };

    document.body.addEventListener('click', handler);
    return () => document.body.removeEventListener('click', handler);
  }, [ref]);
}
