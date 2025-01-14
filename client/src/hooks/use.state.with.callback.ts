import { UpdateState } from '@/types/hooks.types';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useStateWithCallback = <T>(
  initialState: T
): [T, UpdateState<T>] => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<() => void>();

  const updateState: UpdateState<T> = useCallback((data, cb) => {
    if (cb) {
      cbRef.current = cb;
    }

    setState((prev) => (typeof data === 'function' ? data(prev) : data));
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current();
      cbRef.current = undefined;
    }
  }, [state]);

  return [state, updateState];
};
