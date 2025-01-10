import { UpdateState } from '@/types/hooks.types';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useStateWithCallback = <T extends unknown[]>(
  initialState: T
): [T, UpdateState<T>] => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef();

  const updateState: UpdateState<T> = useCallback((data, cb) => {
    cbRef.current;

    console.log('data', typeof data);
    console.log('state', state);

    setState(typeof data === 'function' ? data(state) : data);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current();
      cbRef.current = undefined;
    }
  }, [state]);

  return [state, updateState];
};
