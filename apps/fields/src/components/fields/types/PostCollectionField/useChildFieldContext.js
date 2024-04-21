import { useContext } from 'react';
import ChildFieldContext from './ChildFieldContext';

export default function useChildFieldContext() {
    return useContext(ChildFieldContext);
}