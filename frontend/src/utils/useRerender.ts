import { useCallback, useState } from 'react';

export const useRerender = (): (() => void) => {
    const [, setState] = useState<number>(0);
    return useCallback(() => setState((state) => state + 1), []);
};
