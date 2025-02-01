import { GridSize, PlayerCount } from '../types/game';

const playerCounts: PlayerCount[] = [2, 3, 4];

const gridSizes: GridSize[] = ['3x3', '5x5', '7x7'];

const gridSizeMap = {
	'3x3': [3, 3],
	'5x5': [5, 5],
	'7x7': [7, 7]
};

export const gameConfig = {
	playerCounts,
	gridSizes,
	gridSizeMap
};
