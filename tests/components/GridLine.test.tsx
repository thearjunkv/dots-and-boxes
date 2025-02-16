import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GridLine from '../../src/components/GridLine';
import { testIds } from '../../src/constants/testIds';

describe('GridLine component', () => {
	it('should be in the document with horizontal alignment', () => {
		render(
			<GridLine
				alignment='horizontal'
				handleLineClick={() => {}}
				playerCount={4}
			/>
		);
		expect(screen.getByTestId(testIds.GRID_LINE)).toHaveClass('grid-line--horizontal');
	});

	it('should be in the document with vertical alignment', () => {
		render(
			<GridLine
				alignment='vertical'
				handleLineClick={() => {}}
				playerCount={4}
			/>
		);
		expect(screen.getByTestId(testIds.GRID_LINE)).toHaveClass('grid-line--vertical');
	});

	it('should apply styling when selected by player-1', async () => {
		render(
			<GridLine
				alignment='vertical'
				handleLineClick={() => {}}
				selectedBy={1}
				playerCount={4}
			/>
		);
		const gridLine = screen.getByTestId(testIds.GRID_LINE);

		expect(gridLine).toHaveClass('grid-line--selected');
		expect(gridLine).toHaveClass('player-1');
	});

	it('should apply styling when selected by player-2', async () => {
		render(
			<GridLine
				alignment='vertical'
				handleLineClick={() => {}}
				selectedBy={2}
				playerCount={4}
			/>
		);
		const gridLine = screen.getByTestId(testIds.GRID_LINE);

		expect(gridLine).toHaveClass('grid-line--selected');
		expect(gridLine).toHaveClass('player-2');
	});

	it('should not apply any styling when not selected by any players', async () => {
		render(
			<GridLine
				alignment='vertical'
				handleLineClick={() => {}}
				playerCount={4}
			/>
		);
		expect(screen.getByTestId(testIds.GRID_LINE)).not.toHaveClass('grid-line--selected');
	});

	it('should throw error for player id of 0 where playerCount is 4', async () => {
		expect(() =>
			render(
				<GridLine
					alignment='vertical'
					handleLineClick={() => {}}
					selectedBy={0}
					playerCount={4}
				/>
			)
		).toThrowError(/between 1 and 4/);
	});

	it('should throw error for player id of 6 where playerCount is 3', async () => {
		expect(() =>
			render(
				<GridLine
					alignment='vertical'
					handleLineClick={() => {}}
					selectedBy={6}
					playerCount={3}
				/>
			)
		).toThrowError(/between 1 and 3/);
	});

	it('should call the handleLineClick function when clicked', async () => {
		const handleLineClick = vi.fn(() => {});
		render(
			<GridLine
				alignment='vertical'
				handleLineClick={handleLineClick}
				playerCount={3}
			/>
		);

		const user = userEvent.setup();
		await user.click(screen.getByTestId(testIds.GRID_LINE));

		expect(handleLineClick).toHaveBeenCalledOnce();
	});
});
