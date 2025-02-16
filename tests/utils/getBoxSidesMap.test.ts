import { getBoxSidesMap } from '../../src/utils/gameUtils';

describe('Game util func - getBoxSidesMap', () => {
	it('should throw error for grid size with negative row and column counts', () => {
		expect(() => getBoxSidesMap(-1, -1)).toThrowError(/greater than zero/i);
	});

	it('should throw error for grid size with zero row and column counts', () => {
		expect(() => getBoxSidesMap(0, 0)).toThrowError(/greater than zero/i);
	});

	it('should return an instance of Map for 5x5', () => {
		expect(getBoxSidesMap(5, 5)).toBeInstanceOf(Map);
	});

	const boxSidesMap = getBoxSidesMap(5, 5);
	it.each([
		['0-0', ['0-0', '1-0', '1-1', '2-0']],
		['0-1', ['0-1', '1-1', '1-2', '2-1']],
		['0-2', ['0-2', '1-2', '1-3', '2-2']],
		['0-3', ['0-3', '1-3', '1-4', '2-3']],
		['0-4', ['0-4', '1-4', '1-5', '2-4']],

		['1-0', ['2-0', '3-0', '3-1', '4-0']],
		['1-1', ['2-1', '3-1', '3-2', '4-1']],
		['1-2', ['2-2', '3-2', '3-3', '4-2']],
		['1-3', ['2-3', '3-3', '3-4', '4-3']],
		['1-4', ['2-4', '3-4', '3-5', '4-4']],

		['2-0', ['4-0', '5-0', '5-1', '6-0']],
		['2-1', ['4-1', '5-1', '5-2', '6-1']],
		['2-2', ['4-2', '5-2', '5-3', '6-2']],
		['2-3', ['4-3', '5-3', '5-4', '6-3']],
		['2-4', ['4-4', '5-4', '5-5', '6-4']],

		['3-0', ['6-0', '7-0', '7-1', '8-0']],
		['3-1', ['6-1', '7-1', '7-2', '8-1']],
		['3-2', ['6-2', '7-2', '7-3', '8-2']],
		['3-3', ['6-3', '7-3', '7-4', '8-3']],
		['3-4', ['6-4', '7-4', '7-5', '8-4']],

		['4-0', ['8-0', '9-0', '9-1', '10-0']],
		['4-1', ['8-1', '9-1', '9-2', '10-1']],
		['4-2', ['8-2', '9-2', '9-3', '10-2']],
		['4-3', ['8-3', '9-3', '9-4', '10-3']],
		['4-4', ['8-4', '9-4', '9-5', '10-4']]
	])('should return a box id of %s with sides %j for grid size 5x5', (boxId, sidesArr) => {
		expect(boxSidesMap.get(boxId)).toEqual(sidesArr);
	});
});
