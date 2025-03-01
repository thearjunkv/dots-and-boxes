import { render, screen } from '@testing-library/react';
import GameGrid from '../../src/components/GameGrid';
import { getTotalGridLines, getTotalHorizontalGridLines, getTotalVerticalGridLines } from '../../src/utils/gameUtils';
import { testIds } from '../../src/constants/testIds';
import { gameConfig } from '../../src/constants/gameConfig';
import { checkPlayerColor, getCapturedGridBoxes, getSelectedGridLines } from '../../src/utils/testUtils';

describe('GameGrid component', () => {
	const initialProps = {
		rowCount: 5,
		colCount: 5,
		capturedBoxesMap: new Map(),
		selectedLinesToPlayerMap: new Map(),
		handleLineClick: () => {},
		playerColorsMap: gameConfig.playerColorsMap
	};

	it('should render with correct number of grid lines and boxes for 5x5', () => {
		const [rowCount, colCount] = [5, 5];
		render(<GameGrid {...initialProps} />);

		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		expect(gridLines).toHaveLength(getTotalGridLines(rowCount, colCount));

		const horizontalGridLines = gridLines.filter(line => line.classList.contains('grid-line--horizontal'));
		const verticalGridLines = gridLines.filter(line => line.classList.contains('grid-line--vertical'));

		expect(horizontalGridLines).toHaveLength(getTotalHorizontalGridLines(rowCount, colCount));
		expect(verticalGridLines).toHaveLength(getTotalVerticalGridLines(rowCount, colCount));

		expect(screen.getAllByTestId(testIds.GRID_BOX)).toHaveLength(rowCount * colCount);
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
		expect(gridLines).toHaveLength(getTotalGridLines(rowCount, colCount));

		const horizontalGridLines = gridLines.filter(line => line.classList.contains('grid-line--horizontal'));
		const verticalGridLines = gridLines.filter(line => line.classList.contains('grid-line--vertical'));

		expect(horizontalGridLines).toHaveLength(getTotalHorizontalGridLines(rowCount, colCount));
		expect(verticalGridLines).toHaveLength(getTotalVerticalGridLines(rowCount, colCount));

		expect(screen.getAllByTestId(testIds.GRID_BOX)).toHaveLength(rowCount * colCount);
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
		expect(gridLines).toHaveLength(getTotalGridLines(rowCount, colCount));

		const horizontalGridLines = gridLines.filter(line => line.classList.contains('grid-line--horizontal'));
		const verticalGridLines = gridLines.filter(line => line.classList.contains('grid-line--vertical'));

		expect(horizontalGridLines).toHaveLength(getTotalHorizontalGridLines(rowCount, colCount));
		expect(verticalGridLines).toHaveLength(getTotalVerticalGridLines(rowCount, colCount));

		expect(screen.getAllByTestId(testIds.GRID_BOX)).toHaveLength(rowCount * colCount);
	});

	it('should be initialized with no selected lines and boxes', () => {
		render(<GameGrid {...initialProps} />);
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const gridBoxes = screen.getAllByTestId(testIds.GRID_BOX);

		gridLines.forEach(line => expect(line).not.toHaveClass('grid-line--selected'));
		gridBoxes.forEach(box => expect(box).not.toHaveClass('grid-box--captured'));
	});

	it('should apply styling for selected lines and captured boxes', () => {
		render(
			<GameGrid
				{...initialProps}
				selectedLinesToPlayerMap={
					new Map([
						['1-1', 1],
						['1-2', 2]
					])
				}
				capturedBoxesMap={
					new Map([
						['1-1', 1],
						['1-2', 2]
					])
				}
			/>
		);
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const gridBoxes = screen.getAllByTestId(testIds.GRID_BOX);

		expect(getSelectedGridLines(gridLines)).toHaveLength(2);
		expect(getCapturedGridBoxes(gridBoxes)).toHaveLength(2);
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
						['1-1', 1],
						['1-2', 2]
					])
				}
				capturedBoxesMap={
					new Map([
						['1-1', 1],
						['1-2', 2]
					])
				}
			/>
		);
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const gridBoxes = screen.getAllByTestId(testIds.GRID_BOX);

		const player1Color = gameConfig.playerColorsMap.get(1);
		const player2Color = gameConfig.playerColorsMap.get(2);
		expect(typeof player1Color).toBe('string');
		expect(typeof player2Color).toBe('string');

		checkPlayerColor(gridLines[0], player1Color as string);
		checkPlayerColor(gridBoxes[0], player1Color as string);

		checkPlayerColor(gridLines[1], player2Color as string);
		checkPlayerColor(gridBoxes[1], player2Color as string);
	});
});
