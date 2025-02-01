import { createContext } from 'react';
import { TGameContext } from './types';

export const GameContext = createContext<TGameContext | null>(null);
