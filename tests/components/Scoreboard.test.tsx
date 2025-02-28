import { render, screen } from '@testing-library/react';
import Scoreboard from '../../src/components/Scoreboard';
import { PlayerScore } from '../../src/types/game';
import userEvent from '@testing-library/user-event';

describe('Scoreboard component', () => {
	it('should render the scoreboard with provided data', async () => {
		const onPlayAgain = vi.fn(() => {});
		const onLeave = vi.fn(() => {});
		const playerScores: PlayerScore[] = [
			{
				playerId: 1,
				playerName: 'Player 1',
				score: 20
			},
			{
				playerId: 2,
				playerName: 'Player 2',
				score: 15
			}
		];
		render(
			<Scoreboard
				playerScores={playerScores}
				onPlayAgain={onPlayAgain}
				onLeave={onLeave}
			/>
		);

		const playerIcons = screen.getAllByAltText(/player icon/i);
		expect(playerIcons).toHaveLength(2);

		playerIcons.forEach((icon, index) => expect(icon).toHaveAttribute('src', `/assets/player-${index + 1}.svg`));

		expect(screen.getByText('Player 1')).toBeInTheDocument();
		expect(screen.getByText('Player 2')).toBeInTheDocument();

		expect(screen.getByText('20')).toBeInTheDocument();
		expect(screen.getByText('15')).toBeInTheDocument();

		const user = userEvent.setup();

		await user.click(screen.getByText(/play again/i));
		expect(onPlayAgain).toHaveBeenCalledOnce();

		await user.click(screen.getByText(/leave/i));
		expect(onLeave).toHaveBeenCalledOnce();
	});
});
