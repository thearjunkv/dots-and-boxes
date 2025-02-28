import { GridSize, PlayerCount } from '../types/game';

const playerCounts: PlayerCount[] = [2, 3, 4];

const playerColorsMap: Map<number, string> = new Map([
	[1, '#FF5F1F'],
	[2, '#3498db'],
	[3, '#50C878'],
	[4, '#e1a63b']
]);

const gridSizes: GridSize[] = ['5x5', '6x6', '7x7'];

const gridSizeMap: { [key in GridSize]: [number, number] } = {
	'5x5': [5, 5],
	'6x6': [6, 6],
	'7x7': [7, 7]
};

export const gameConfig = {
	playerCounts,
	playerColorsMap,
	gridSizes,
	gridSizeMap
};
