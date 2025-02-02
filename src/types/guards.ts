import { GridSize, PlayerCount } from './game';

export const isValidPlayerCount = (value: number): value is PlayerCount => [2, 3, 4].includes(value);

export const isValidGridSize = (value: string): value is GridSize => ['4x4', '6x6', '8x6'].includes(value);
