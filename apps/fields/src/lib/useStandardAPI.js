import { useMemo } from 'react';
import StandardAPI from '../api/StandardAPI';

export function useStandardAPI(routeBase) {
    return useMemo(() => new StandardAPI(routeBase), [routeBase]);
}
