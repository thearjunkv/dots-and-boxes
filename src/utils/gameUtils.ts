export const getGridBoxVertices = (gridRowCount: number, gridColCount: number) =>
	Array.from({ length: gridRowCount }, (_, gridRowIndex) => {
		return Array.from({ length: gridColCount }, (_, gridColIndex) => {
			const init1 = gridRowIndex * 2;
			const init2 = gridColIndex * 2 + 1;

			const line1 = `${init1}-${init2}`;
			const line2 = `${init1 + 1}-${init2 - 1}`;
			const line3 = `${init1 + 1}-${init2 + 1}`;
			const line4 = `${init1 + 2}-${init2}`;

			return [line1, line2, line3, line4];
		});
	});
