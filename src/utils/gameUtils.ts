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

export const handleGridLineClick = <T>(
	lineId: string,
	selectedLinesToPlayerMap: Map<string, T>,
	capturedBoxesMap: Map<string, T>,
	boxSidesMap: Map<string, string[]>,
	playerTurn: T
) => {
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
		hasCapturedNewBox
	};
};

export const getTotalGridLines = (rowCount: number, colCount: number) =>
	getTotalHorizontalGridLines(rowCount, colCount) + getTotalVerticalGridLines(rowCount, colCount);

export const getTotalHorizontalGridLines = (rowCount: number, colCount: number) => (rowCount + 1) * colCount;

export const getTotalVerticalGridLines = (rowCount: number, colCount: number) => (colCount + 1) * rowCount;

export const convertOddNumToIndex = (n: number) => (n - 1) / 2;

export const convertEvenNumToIndex = (n: number) => n / 2;

export const getPlayerId = () => {
	let playerId = sessionStorage.getItem('playerId');
	if (!playerId) {
		playerId = crypto.randomUUID();
		sessionStorage.setItem('playerId', playerId);
	}
	return playerId;
};
