import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, GameDispatch} from './gameStore';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useGameDispatch: () => GameDispatch = useDispatch;
export const useGameSelector: TypedUseSelectorHook<RootState> = useSelector;
