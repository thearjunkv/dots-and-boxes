import { GridSize, PlayerCount } from '../types/game';

const playerCounts: PlayerCount[] = [2, 3, 4];

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
	gridSizes,
	gridSizeMap,
	gridBoxSizeMap
};
