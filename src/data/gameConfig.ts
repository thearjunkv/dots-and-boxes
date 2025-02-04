import { GridSize, PlayerCount } from '../types/game';

const playerCounts: PlayerCount[] = [2, 3, 4];

const playerColorsMap: Map<number, string> = new Map([
	[1, '#f08585'],
	[2, '#3498db'],
	[3, '#9fccad'],
	[4, '#ffd89c']
]);

const gridSizes: GridSize[] = ['4x4', '6x6', '8x6'];

const gridSizeMap: { [key in GridSize]: [number, number] } = {
	'4x4': [4, 4],
	'6x6': [6, 6],
	'8x6': [8, 6]
};

export const gameConfig = {
	playerCounts,
	playerColorsMap,
	gridSizes,
	gridSizeMap
};
