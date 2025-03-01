export const getBoxSides = (boxId: string) => {
	if (!/^\d+-\d+$/.test(boxId)) throw new Error('Invalid boxId: ' + boxId);

	const [rowId, colId] = boxId.split('-').map(n => Number(n));
	const side1 = `${rowId * 2 - 1}-${colId}`;
	const side2 = `${rowId * 2}-${colId}`;
	const side3 = `${rowId * 2}-${colId + 1}`;
	const side4 = `${rowId * 2 + 1}-${colId}`;

	return [side1, side2, side3, side4];
};

export const getBoxSidesMap = (rowCount: number, colCount: number) => {
	if (rowCount <= 0 || colCount <= 0) throw new Error('Row and column counts must be greater than zero.');

	const boxSidesMap = new Map<string, string[]>();

	Array.from({ length: rowCount }, (_, rowIndex) => {
		Array.from({ length: colCount }, (_, colIndex) => {
			const row = rowIndex + 1;
			const col = colIndex + 1;

			const boxId = `${row}-${col}`;
			const sides = getBoxSides(boxId);
			boxSidesMap.set(boxId, sides);
		});
	});

	return boxSidesMap;
};

export const oddToPos = (n: number) => (n + 1) / 2;

export const evenToPos = (n: number) => n / 2;

export const getIntersectingBoxIds = (lineId: string, rowCount: number, colCount: number) => {
	if (!/^\d+-\d+$/.test(lineId)) throw new Error('Invalid lineId: ' + lineId);

	const [rowId, colId] = lineId.split('-').map(n => Number(n));

	// horizontal

	if (rowId % 2 === 1) {
		const topBox = `${oddToPos(rowId) - 1}-${colId}`;
		const bottomBox = `${oddToPos(rowId)}-${colId}`;

		if (rowId === 1) return [bottomBox];
		if (rowId === rowCount * 2 + 1) return [topBox];

		return [topBox, bottomBox];
	}

	// vertical

	const leftBox = `${evenToPos(rowId)}-${colId - 1}`;
	const rightBox = `${evenToPos(rowId)}-${colId}`;

	if (colId === 1) return [rightBox];
	if (colId === colCount + 1) return [leftBox];

	return [leftBox, rightBox];
};

export const handleGridLineClick = <T>(
	rowCount: number,
	colCount: number,
	lineId: string,
	selectedLinesToPlayerMap: Map<string, T>,
	capturedBoxesMap: Map<string, T>,
	playerTurn: T
) => {
	if (selectedLinesToPlayerMap.has(lineId)) return;

	selectedLinesToPlayerMap.set(lineId, playerTurn);

	let hasCapturedNewBox: boolean = false;
	const boxIds = getIntersectingBoxIds(lineId, rowCount, colCount);

	boxIds.forEach(boxId => {
		const sides = getBoxSides(boxId);

		const allSelected = sides.every(side => selectedLinesToPlayerMap.has(side));
		if (!allSelected) return;

		if (capturedBoxesMap.has(boxId)) return;
		capturedBoxesMap.set(boxId, playerTurn);
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

export const getPlayerId = () => {
	let playerId = sessionStorage.getItem('playerId');
	if (!playerId) {
		playerId = crypto.randomUUID();
		sessionStorage.setItem('playerId', playerId);
	}
	return playerId;
};
