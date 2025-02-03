import { GridSize, PlayerCount } from '../types/game';

const playerCounts: PlayerCount[] = [2, 3, 4];

const playerColors: Map<number, string> = new Map([
	[1, '#f08585'],
	[2, '#5665e5'],
	[3, '#9fccad'],
	[4, '#ffd89c']
]);

const gridSizes: GridSize[] = ['4x4', '6x6', '8x6'];

const gridSizeMap: { [key in GridSize]: [number, number] } = {
	'4x4': [4, 4],
	'6x6': [6, 6],
	'8x6': [8, 6]
};

const gridBoxSizeMap: { [key in GridSize]: number } = {
	'4x4': 50,
	'6x6': 40,
	'8x6': 40
};

export const gameConfig = {
	playerCounts,
	playerColors,
	gridSizes,
	gridSizeMap,
	gridBoxSizeMap
};
