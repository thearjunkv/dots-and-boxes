export const getBoxSidesMap = (rowCount: number, colCount: number) => {
	if (rowCount <= 0 || colCount <= 0) throw new Error('Row and column counts must be greater than zero.');

	const boxSidesMap = new Map<string, string[]>();

	Array.from({ length: rowCount }, (_, rowIndex) => {
		Array.from({ length: colCount }, (_, colIndex) => {
			const row = rowIndex * 2;
			const col = colIndex * 2 + 1;

			const side1 = `${row}-${col}`;
			const side2 = `${row + 1}-${col - 1}`;
			const side3 = `${row + 1}-${col + 1}`;
			const side4 = `${row + 2}-${col}`;

			const boxId = `${rowIndex * 2 + 1}-${colIndex * 2 + 1}`;
			boxSidesMap.set(boxId, [side1, side2, side3, side4]);
		});
	});

	return boxSidesMap;
};
