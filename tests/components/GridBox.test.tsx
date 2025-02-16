import { render, screen } from '@testing-library/react';
import GridBox from '../../src/components/GridBox';
import { testIds } from '../../src/constants/testIds';

describe('GridBox component', () => {
	it('should be in the document with inital state', () => {
		render(
			<GridBox
				boxId='0-0'
				capturedBoxesMap={new Map()}
			/>
		);
		expect(screen.getByTestId(testIds.GRID_BOX)).not.toHaveClass('grid-box--captured');
	});

	it('should apply styling when captured by player-1', async () => {
		render(
			<GridBox
				boxId='0-0'
				capturedBoxesMap={new Map([['0-0', 1]])}
			/>
		);
		const gridBox = screen.getByTestId(testIds.GRID_BOX);

		expect(gridBox).toHaveClass('grid-box--captured');
		expect(gridBox).toHaveClass('player-1');
	});
});
