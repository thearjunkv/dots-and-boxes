import { render, screen } from '@testing-library/react';
import GridBox from '../../src/components/GridBox';
import { testIds } from '../../src/constants/testIds';
import { gameConfig } from '../../src/constants/gameConfig';
import { checkPlayerColor } from '../../src/utils/testUtils';

describe('GridBox component', () => {
	it('should be in the document with inital state', () => {
		render(<GridBox isCaptured={false} />);
		expect(screen.getByTestId(testIds.GRID_BOX)).not.toHaveClass('grid-box--captured');
	});

	it('should apply styling when captured', async () => {
		const playerColor = gameConfig.playerColorsMap.get(1);

		render(
			<GridBox
				isCaptured={true}
				playerColor={playerColor}
			/>
		);
		const gridBox = screen.getByTestId(testIds.GRID_BOX);
		expect(gridBox).toHaveClass('grid-box--captured');

		expect(typeof playerColor).toBe('string');
		checkPlayerColor(gridBox, playerColor as string);
	});
});
