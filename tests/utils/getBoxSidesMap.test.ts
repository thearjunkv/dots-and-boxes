import { getBoxSidesMap } from '../../src/utils/gameUtils';

describe('Game util func - getBoxSidesMap', () => {
	const boxSidesMap = getBoxSidesMap(3, 3);

	it('should throw error for grid size with negative row and column counts', () => {
		expect(() => getBoxSidesMap(-1, -1)).toThrowError(/greater than zero/i);
	});

	it('should throw error for grid size with zero row and column counts', () => {
		expect(() => getBoxSidesMap(0, 0)).toThrowError(/greater than zero/i);
	});

	it('should return an instance of Map for 3x3', () => {
		expect(boxSidesMap).toBeInstanceOf(Map);
	});

	it.each([
		['1-1', ['0-1', '1-0', '1-2', '2-1']],
		['1-3', ['0-3', '1-2', '1-4', '2-3']],
		['1-5', ['0-5', '1-4', '1-6', '2-5']],
		['3-1', ['2-1', '3-0', '3-2', '4-1']],
		['3-3', ['2-3', '3-2', '3-4', '4-3']],
		['3-5', ['2-5', '3-4', '3-6', '4-5']],
		['5-1', ['4-1', '5-0', '5-2', '6-1']],
		['5-3', ['4-3', '5-2', '5-4', '6-3']],
		['5-5', ['4-5', '5-4', '5-6', '6-5']]
	])('should return a box id of %s with sides %j for grid size 3x3', (boxId, sidesArr) => {
		expect(boxSidesMap.get(boxId)).toEqual(sidesArr);
	});
});
