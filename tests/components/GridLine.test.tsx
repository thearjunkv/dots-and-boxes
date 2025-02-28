import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GridLine from '../../src/components/GridLine';
import { testIds } from '../../src/constants/testIds';
import { gameConfig } from '../../src/constants/gameConfig';
import { checkPlayerColor } from '../../src/utils/testUtils';

describe('GridLine component', () => {
	it('should be in the document with horizontal alignment', () => {
		render(
			<GridLine
				alignment='horizontal'
				handleLineClick={() => {}}
				isSelected={false}
			/>
		);
		expect(screen.getByTestId(testIds.GRID_LINE)).toHaveClass('grid-line--horizontal');
	});

	it('should be in the document with vertical alignment', () => {
		render(
			<GridLine
				alignment='vertical'
				handleLineClick={() => {}}
				isSelected={false}
			/>
		);
		expect(screen.getByTestId(testIds.GRID_LINE)).toHaveClass('grid-line--vertical');
	});

	it('should apply styling when selected', async () => {
		const playerColor = gameConfig.playerColorsMap.get(1);
		render(
			<GridLine
				alignment='vertical'
				handleLineClick={() => {}}
				isSelected={true}
				playerColor={playerColor}
			/>
		);
		const gridLine = screen.getByTestId(testIds.GRID_LINE);
		expect(gridLine).toHaveClass('grid-line--selected');

		expect(typeof playerColor).toBe('string');
		checkPlayerColor(gridLine, playerColor as string);
	});

	it('should not apply any styling when not selected by any players', async () => {
		render(
			<GridLine
				alignment='vertical'
				handleLineClick={() => {}}
				isSelected={false}
			/>
		);
		expect(screen.getByTestId(testIds.GRID_LINE)).not.toHaveClass('grid-line--selected');
	});

	it('should call the handleLineClick function when clicked', async () => {
		const handleLineClick = vi.fn(() => {});
		render(
			<GridLine
				alignment='vertical'
				handleLineClick={handleLineClick}
				isSelected={false}
			/>
		);

		const user = userEvent.setup();
		await user.click(screen.getByTestId(testIds.GRID_LINE));

		expect(handleLineClick).toHaveBeenCalledOnce();
	});
});
