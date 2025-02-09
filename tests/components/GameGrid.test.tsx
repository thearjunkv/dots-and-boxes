import { render, screen } from '@testing-library/react';
import GameGrid from '../../src/components/GameGrid';
import { getBoxSidesMap, getTotalGridLines, handleGridLineClick } from '../../src/utils/gameUtils';
import userEvent from '@testing-library/user-event';

describe('GameGrid component', () => {
	let selectedLinesToPlayerMap: Map<string, number> = new Map();
	let capturedBoxesMap: Map<string, number> = new Map();
	let playerTurn = 1;

	const playerCount = 3;
	const [gridRowCount, gridColCount] = [5, 5];

	const boxSidesMap = getBoxSidesMap(gridRowCount, gridColCount);

	const handleLineClick = vi.fn((lineId: string) => {
		const result = handleGridLineClick(lineId, boxSidesMap, playerCount, {
			selectedLinesToPlayerMap: new Map(selectedLinesToPlayerMap),
			capturedBoxesMap: new Map(capturedBoxesMap),
			playerTurn
		});

		if (!result) return;

		selectedLinesToPlayerMap = result.selectedLinesToPlayerMap;
		capturedBoxesMap = result.capturedBoxesMap;
		playerTurn = result.playerTurn;
	});

	let rerenderFn: ((ui: React.ReactNode) => void) | undefined;

	beforeEach(() => {
		const { rerender } = render(
			<GameGrid
				rowCount={gridRowCount}
				colCount={gridColCount}
				capturedBoxesMap={capturedBoxesMap}
				selectedLinesToPlayerMap={selectedLinesToPlayerMap}
				handleLineClick={handleLineClick}
			/>
		);

		rerenderFn = rerender;
	});

	it('should render with expected no of grid lines and boxes', () => {
		const gridLines = screen.getAllByTestId('grid-line');
		const gridBoxes = screen.getAllByTestId('grid-box');

		expect(gridLines.length).toBe(getTotalGridLines(gridRowCount, gridColCount));
		expect(gridBoxes.length).toBe(gridRowCount * gridColCount);
	});

	it('should update state when clicking a line', async () => {
		const gridLines = screen.getAllByTestId('grid-line');

		const user = userEvent.setup();
		await user.click(gridLines[0]);

		expect(handleLineClick).toHaveBeenCalledOnce();

		if (!rerenderFn) throw new Error('rerenderFn is not initialised');
		rerenderFn(
			<GameGrid
				rowCount={gridRowCount}
				colCount={gridColCount}
				capturedBoxesMap={capturedBoxesMap}
				selectedLinesToPlayerMap={selectedLinesToPlayerMap}
				handleLineClick={handleLineClick}
			/>
		);

		const selectedGridLines = gridLines.filter(gridLine => gridLine.classList.contains('grid-line--selected'));
		expect(selectedGridLines.length).toBe(1);
	});
});
