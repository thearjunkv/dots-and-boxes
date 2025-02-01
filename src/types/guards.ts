import { GridSize, PlayerCount } from './game';

export const isValidPlayerCount = (value: number): value is PlayerCount => [2, 3, 4].includes(value);

export const isValidGridSize = (value: string): value is GridSize => ['3x3', '5x5', '7x7'].includes(value);
