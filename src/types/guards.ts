import { GridSize, PlayerCount } from './game';

export const isValidPlayerCount = (value: number): value is PlayerCount => [2, 3, 4].includes(value);

export const isValidGridSize = (value: string): value is GridSize => ['5x5', '6x6', '7x7'].includes(value);
