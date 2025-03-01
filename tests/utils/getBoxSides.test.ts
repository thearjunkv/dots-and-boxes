import { getBoxSides } from '../../src/utils/gameUtils';

describe('Game util func - getBoxSides', () => {
	it('should throw error for boxId of 2-b', () => {
		expect(() => getBoxSides('2-b')).toThrowError(/invalid boxId/i);
	});

	it('should throw error for boxId of ln-bj', () => {
		expect(() => getBoxSides('ln-bj')).toThrowError(/invalid boxId/i);
	});

	it.each([
		[['1-1', '2-1', '2-2', '3-1'], '1-1'],
		[['3-2', '4-2', '4-3', '5-2'], '2-2'],
		[['5-3', '6-3', '6-4', '7-3'], '3-3'],
		[['7-4', '8-4', '8-5', '9-4'], '4-4'],
		[['9-5', '10-5', '10-6', '11-5'], '5-5']
	])('should return %j for boxId of %s', (sidesArr, boxId) => {
		expect(getBoxSides(boxId)).toEqual(sidesArr);
	});
});
