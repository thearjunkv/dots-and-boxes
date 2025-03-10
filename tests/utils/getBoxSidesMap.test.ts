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
		['1-1', ['1-1', '2-1', '2-2', '3-1']],
		['1-2', ['1-2', '2-2', '2-3', '3-2']],
		['1-3', ['1-3', '2-3', '2-4', '3-3']],
		['1-4', ['1-4', '2-4', '2-5', '3-4']],
		['1-5', ['1-5', '2-5', '2-6', '3-5']],

		['2-1', ['3-1', '4-1', '4-2', '5-1']],
		['2-2', ['3-2', '4-2', '4-3', '5-2']],
		['2-3', ['3-3', '4-3', '4-4', '5-3']],
		['2-4', ['3-4', '4-4', '4-5', '5-4']],
		['2-5', ['3-5', '4-5', '4-6', '5-5']],

		['3-1', ['5-1', '6-1', '6-2', '7-1']],
		['3-2', ['5-2', '6-2', '6-3', '7-2']],
		['3-3', ['5-3', '6-3', '6-4', '7-3']],
		['3-4', ['5-4', '6-4', '6-5', '7-4']],
		['3-5', ['5-5', '6-5', '6-6', '7-5']],

		['4-1', ['7-1', '8-1', '8-2', '9-1']],
		['4-2', ['7-2', '8-2', '8-3', '9-2']],
		['4-3', ['7-3', '8-3', '8-4', '9-3']],
		['4-4', ['7-4', '8-4', '8-5', '9-4']],
		['4-5', ['7-5', '8-5', '8-6', '9-5']],

		['5-1', ['9-1', '10-1', '10-2', '11-1']],
		['5-2', ['9-2', '10-2', '10-3', '11-2']],
		['5-3', ['9-3', '10-3', '10-4', '11-3']],
		['5-4', ['9-4', '10-4', '10-5', '11-4']],
		['5-5', ['9-5', '10-5', '10-6', '11-5']]
	])('should have a key (box id) of %s with value (sides) of %j', (boxId, sidesArr) => {
		expect(boxSidesMap.get(boxId)).toEqual(sidesArr);
	});
});
