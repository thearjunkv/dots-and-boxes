import { GameState } from '../types/game';

export const getBoxSidesMap = (rowCount: number, colCount: number) => {
	if (rowCount <= 0 || colCount <= 0) throw new Error('Row and column counts must be greater than zero.');

	const boxSidesMap = new Map<string, string[]>();

	Array.from({ length: rowCount }, (_, rowIndex) => {
		Array.from({ length: colCount }, (_, colIndex) => {
			const row = rowIndex * 2;
			const col = colIndex;

			const side1 = `${row}-${col}`;
			const side2 = `${row + 1}-${col}`;
			const side3 = `${row + 1}-${col + 1}`;
			const side4 = `${row + 2}-${col}`;

			const boxId = `${rowIndex}-${colIndex}`;
			boxSidesMap.set(boxId, [side1, side2, side3, side4]);
		});
	});

	return boxSidesMap;
};

export const handleGridLineClick = (
	lineId: string,
	boxSidesMap: Map<string, string[]>,
	playerCount: number,
	gameState: GameState
) => {
	const { selectedLinesToPlayerMap, capturedBoxesMap, playerTurn } = gameState;
	if (selectedLinesToPlayerMap.has(lineId)) return;

	selectedLinesToPlayerMap.set(lineId, playerTurn);

	let hasCapturedNewBox: boolean = false;
	boxSidesMap.forEach((value, key) => {
		const allSelected = value.every(side => selectedLinesToPlayerMap.has(side));

		if (!allSelected) return;
		if (capturedBoxesMap.has(key)) return;

		capturedBoxesMap.set(key, playerTurn);
		hasCapturedNewBox = true;
	});

	return {
		selectedLinesToPlayerMap,
		capturedBoxesMap,
		playerTurn: hasCapturedNewBox ? playerTurn : playerTurn >= playerCount ? 1 : playerTurn + 1
	};
};

export const getTotalGridLines = (rowCount: number, colCount: number) =>
	getTotalHorizontalGridLines(rowCount, colCount) + getTotalVerticalGridLines(rowCount, colCount);

export const getTotalHorizontalGridLines = (rowCount: number, colCount: number) => (rowCount + 1) * colCount;

export const getTotalVerticalGridLines = (rowCount: number, colCount: number) => (colCount + 1) * rowCount;

export const convertOddNumToIndex = (n: number) => (n - 1) / 2;

export const convertEvenNumToIndex = (n: number) => n / 2;

export const createPlayerId = () => Date.now() + '-' + Math.random().toString(36).slice(2, 11);
