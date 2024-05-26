import { useMemo } from 'react';
import StandardAPI from '../api/StandardAPI';

export function useStandardAPI(route_base) {
    return useMemo(() => new StandardAPI(route_base), [route_base]);
}
