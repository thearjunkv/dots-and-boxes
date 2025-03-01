import { getIntersectingBoxIds } from '../../src/utils/gameUtils';

describe('Game util func - getIntersectingBoxIds', () => {
	it('should throw error for lineId of 2-b', () => {
		expect(() => getIntersectingBoxIds('2-b', 5, 5)).toThrowError(/invalid lineId/i);
	});

	it('should throw error for lineId of ln-bj', () => {
		expect(() => getIntersectingBoxIds('ln-bj', 5, 5)).toThrowError(/invalid lineId/i);
	});

	it.each([
		[['1-1'], '1-1'],
		[['1-1', '1-2'], '2-2'],
		[['1-3', '2-3'], '3-3'],
		[['2-3', '2-4'], '4-4'],
		[['2-5', '3-5'], '5-5']
	])('should return %j for boxId of %s', (boxIdArr, lineId) => {
		expect(getIntersectingBoxIds(lineId, 5, 5)).toEqual(boxIdArr);
	});
});
