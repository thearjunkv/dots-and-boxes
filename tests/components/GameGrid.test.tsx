import { render, screen } from '@testing-library/react';
import GameGrid from '../../src/components/GameGrid';
import { getTotalGridLines, getTotalHorizontalGridLines, getTotalVerticalGridLines } from '../../src/utils/gameUtils';
import { testIds } from '../../src/constants/testIds';

describe('GameGrid component', () => {
	const initialProps = {
		rowCount: 5,
		colCount: 5,
		capturedBoxesMap: new Map(),
		selectedLinesToPlayerMap: new Map(),
		handleLineClick: () => {},
		playerCount: 4
	};

	it('should render with correct number of grid lines and boxes for 5x5', () => {
		const [rowCount, colCount] = [5, 5];
		render(<GameGrid {...initialProps} />);

		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		expect(gridLines.length).toBe(getTotalGridLines(rowCount, colCount));

		const horizontalGridLines = gridLines.filter(line => line.classList.contains('grid-line--horizontal'));
		const verticalGridLines = gridLines.filter(line => line.classList.contains('grid-line--vertical'));

		expect(horizontalGridLines.length).toBe(getTotalHorizontalGridLines(rowCount, colCount));
		expect(verticalGridLines.length).toBe(getTotalVerticalGridLines(rowCount, colCount));

		expect(screen.getAllByTestId(testIds.GRID_BOX).length).toBe(rowCount * colCount);
	});

	it('should render with correct number of grid lines and boxes for 7x7', () => {
		const [rowCount, colCount] = [7, 7];
		render(
			<GameGrid
				{...initialProps}
				rowCount={rowCount}
				colCount={colCount}
			/>
		);

		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		expect(gridLines.length).toBe(getTotalGridLines(rowCount, colCount));

		const horizontalGridLines = gridLines.filter(line => line.classList.contains('grid-line--horizontal'));
		const verticalGridLines = gridLines.filter(line => line.classList.contains('grid-line--vertical'));

		expect(horizontalGridLines.length).toBe(getTotalHorizontalGridLines(rowCount, colCount));
		expect(verticalGridLines.length).toBe(getTotalVerticalGridLines(rowCount, colCount));

		expect(screen.getAllByTestId(testIds.GRID_BOX).length).toBe(rowCount * colCount);
	});

	it('should render with correct number of grid lines and boxes for 5x7', () => {
		const [rowCount, colCount] = [5, 7];
		render(
			<GameGrid
				{...initialProps}
				rowCount={rowCount}
				colCount={colCount}
			/>
		);

		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		expect(gridLines.length).toBe(getTotalGridLines(rowCount, colCount));

		const horizontalGridLines = gridLines.filter(line => line.classList.contains('grid-line--horizontal'));
		const verticalGridLines = gridLines.filter(line => line.classList.contains('grid-line--vertical'));

		expect(horizontalGridLines.length).toBe(getTotalHorizontalGridLines(rowCount, colCount));
		expect(verticalGridLines.length).toBe(getTotalVerticalGridLines(rowCount, colCount));

		expect(screen.getAllByTestId(testIds.GRID_BOX).length).toBe(rowCount * colCount);
	});

	it('should be initialized with no selected lines and boxes', () => {
		render(<GameGrid {...initialProps} />);
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const gridBoxes = screen.getAllByTestId(testIds.GRID_BOX);

		expect(gridLines.filter(line => line.classList.contains('grid-line--selected')).length).toBe(0);
		expect(gridBoxes.filter(box => box.classList.contains('grid-box--captured')).length).toBe(0);
	});

	it('should apply styling for selected lines and captured boxes', () => {
		render(
			<GameGrid
				{...initialProps}
				selectedLinesToPlayerMap={
					new Map([
						['0-0', 1],
						['0-1', 2]
					])
				}
				capturedBoxesMap={
					new Map([
						['0-0', 1],
						['0-1', 2]
					])
				}
			/>
		);
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const gridBoxes = screen.getAllByTestId(testIds.GRID_BOX);

		expect(gridLines.filter(line => line.classList.contains('grid-line--selected')).length).toBe(2);
		expect(gridBoxes.filter(box => box.classList.contains('grid-box--captured')).length).toBe(2);
	});

	it('should apply the correct player styling for the selected lines and captured boxes', () => {
		const [rowCount, colCount] = [5, 5];
		render(
			<GameGrid
				{...initialProps}
				rowCount={rowCount}
				colCount={colCount}
				selectedLinesToPlayerMap={
					new Map([
						['0-0', 1],
						['0-1', 2],
						['0-2', 1]
					])
				}
				capturedBoxesMap={
					new Map([
						['0-0', 1],
						['0-1', 2],
						['0-2', 1]
					])
				}
			/>
		);
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const gridBoxes = screen.getAllByTestId(testIds.GRID_BOX);

		expect(gridLines[0]).toHaveClass('player-1');
		expect(gridLines[1]).toHaveClass('player-2');
		expect(gridLines[2]).toHaveClass('player-1');

		expect(gridBoxes[0]).toHaveClass('player-1');
		expect(gridBoxes[1]).toHaveClass('player-2');
		expect(gridBoxes[2]).toHaveClass('player-1');
	});
});
