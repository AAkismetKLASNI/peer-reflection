import { UpdateState } from '@/types/hooks.types';
import { useState, useRef, useEffect } from 'react';

export function useStateWithCallback<T extends unknown[]>(
  initialState: T
): [T, UpdateState<T>] {
  const [state, setState] = useState<T>(initialState);
  const cbRef = useRef<() => void>();

  const updateState: UpdateState<T> = (newState, callback) => {
    cbRef.current = callback;

    setState((prev) =>
      typeof newState === 'function' ? newState(prev) : newState
    );
  };

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current();
      cbRef.current = undefined;
    }
  }, [state]);

  return [state, updateState];
}
