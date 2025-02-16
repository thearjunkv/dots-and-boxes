import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import GameBoard from '../../src/pages/GameBoard';
import { testIds } from '../../src/constants/testIds';
import { getTotalGridLines } from '../../src/utils/gameUtils';
import { getActivePlayerCard, getCapturedGridBoxes, getSelectedGridLines } from '../../src/utils/testUtils';

describe('GameBoard component', () => {
	beforeEach(() => {
		render(
			<MemoryRouter initialEntries={[{ pathname: '/play', state: { playerCount: 4, gridSize: '5x5' } }]}>
				<Routes>
					<Route
						path='/play'
						element={<GameBoard />}
					/>
				</Routes>
			</MemoryRouter>
		);
	});

	it('should render the game grid with size 5x5 and 4 player cards', () => {
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const gridBoxes = screen.getAllByTestId(testIds.GRID_BOX);
		const playerCards = screen.getAllByTestId(testIds.PLAYER_CARD);

		expect(gridLines).toHaveLength(getTotalGridLines(5, 5));
		expect(gridBoxes).toHaveLength(5 * 5);
		expect(playerCards).toHaveLength(4);
	});

	it('should initialize with no selected lines, no captured boxes, and active player card for player 1', () => {
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const gridBoxes = screen.getAllByTestId(testIds.GRID_BOX);
		const playerCards = screen.getAllByTestId(testIds.PLAYER_CARD);

		gridLines.forEach(line => expect(line).not.toHaveClass('grid-line--selected'));
		gridBoxes.forEach(box => expect(box).not.toHaveClass('grid-box--captured'));

		expect(getActivePlayerCard(playerCards)).toHaveTextContent(/player 1/i);
	});

	it('should highlight line and change player turn on click', async () => {
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const playerCards = screen.getAllByTestId(testIds.PLAYER_CARD);
		const user = userEvent.setup();

		await user.click(gridLines[0]);

		const selectedGridLines = getSelectedGridLines(gridLines);
		expect(selectedGridLines).toHaveLength(1);
		expect(selectedGridLines[0]).toHaveClass('player-1');

		expect(getActivePlayerCard(playerCards)).toHaveTextContent(/player 2/i);
	});

	it('should highlight line and change player turn on each click', async () => {
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const playerCards = screen.getAllByTestId(testIds.PLAYER_CARD);
		const user = userEvent.setup();

		await user.click(gridLines[0]);
		await user.click(gridLines[1]);
		await user.click(gridLines[2]);

		const selectedGridLines = getSelectedGridLines(gridLines);

		expect(selectedGridLines).toHaveLength(3);
		expect(selectedGridLines[0]).toHaveClass('player-1');
		expect(selectedGridLines[1]).toHaveClass('player-2');
		expect(selectedGridLines[2]).toHaveClass('player-3');

		expect(getActivePlayerCard(playerCards)).toHaveTextContent(/player 4/i);
	});

	it('should change player turn back to 1 after all player turns are used', async () => {
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const playerCards = screen.getAllByTestId(testIds.PLAYER_CARD);
		const user = userEvent.setup();

		await user.click(gridLines[0]);
		await user.click(gridLines[1]);
		await user.click(gridLines[2]);
		await user.click(gridLines[3]);

		{
			const selectedGridLines = getSelectedGridLines(gridLines);

			expect(selectedGridLines).toHaveLength(4);
			expect(selectedGridLines[0]).toHaveClass('player-1');
			expect(selectedGridLines[1]).toHaveClass('player-2');
			expect(selectedGridLines[2]).toHaveClass('player-3');
			expect(selectedGridLines[3]).toHaveClass('player-4');

			expect(getActivePlayerCard(playerCards)).toHaveTextContent(/player 1/i);
		}

		await user.click(gridLines[4]);

		{
			const selectedGridLines = getSelectedGridLines(gridLines);
			expect(selectedGridLines).toHaveLength(5);
			expect(selectedGridLines[0]).toHaveClass('player-1');
			expect(selectedGridLines[1]).toHaveClass('player-2');
			expect(selectedGridLines[2]).toHaveClass('player-3');
			expect(selectedGridLines[3]).toHaveClass('player-4');
			expect(selectedGridLines[4]).toHaveClass('player-1');

			expect(getActivePlayerCard(playerCards)).toHaveTextContent(/player 2/i);
		}
	});

	it('should not update the board when clicking an already selected line', async () => {
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const playerCards = screen.getAllByTestId(testIds.PLAYER_CARD);
		const user = userEvent.setup();

		await user.click(gridLines[0]);
		await user.click(gridLines[0]);
		await user.click(gridLines[0]);

		const selectedGridLines = getSelectedGridLines(gridLines);
		expect(selectedGridLines).toHaveLength(1);
		expect(selectedGridLines[0]).toHaveClass('player-1');

		expect(getActivePlayerCard(playerCards)).toHaveTextContent(/player 2/i);
	});

	it('should mark the box as captured when all four sides are selected and allow the player to continue their turn', async () => {
		const gridLines = screen.getAllByTestId(testIds.GRID_LINE);
		const gridBoxes = screen.getAllByTestId(testIds.GRID_BOX);
		const playerCards = screen.getAllByTestId(testIds.PLAYER_CARD);
		const user = userEvent.setup();

		await user.click(gridLines[0]);
		await user.click(gridLines[5]);
		await user.click(gridLines[6]);

		expect(getActivePlayerCard(playerCards)).toHaveTextContent(/player 4/i);
		expect(getCapturedGridBoxes(gridBoxes)).toHaveLength(0);

		await user.click(gridLines[11]);

		const capturedGridBoxes = getCapturedGridBoxes(gridBoxes);
		expect(capturedGridBoxes).toHaveLength(1);
		expect(capturedGridBoxes[0]).toHaveClass('player-4');

		expect(getActivePlayerCard(playerCards)).toHaveTextContent(/player 4/i);

		await user.click(gridLines[12]);

		expect(getActivePlayerCard(playerCards)).toHaveTextContent(/player 1/i);
	});
});
