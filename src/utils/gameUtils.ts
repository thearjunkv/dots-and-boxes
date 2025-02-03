export const initializeGridBoxes = (gridRowCount: number, gridColCount: number) => {
	const capturedBoxesMap = new Map<string, number | null>();
	const boxSidesMap = new Map<string, string[]>();

	Array.from({ length: gridRowCount }, (_, gridRowIndex) => {
		Array.from({ length: gridColCount }, (_, gridColIndex) => {
			const row = gridRowIndex * 2;
			const col = gridColIndex * 2 + 1;

			const line1 = `${row}-${col}`;
			const line2 = `${row + 1}-${col - 1}`;
			const line3 = `${row + 1}-${col + 1}`;
			const line4 = `${row + 2}-${col}`;

			const boxId = `${gridRowIndex * 2 + 1}-${gridColIndex * 2 + 1}`;
			capturedBoxesMap.set(boxId, null);
			boxSidesMap.set(boxId, [line1, line2, line3, line4]);
		});
	});

	return { capturedBoxesMap, boxSidesMap };
};
