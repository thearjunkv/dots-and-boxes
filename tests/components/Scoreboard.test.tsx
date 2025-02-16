import { render, screen } from '@testing-library/react';
import Scoreboard from '../../src/components/Scoreboard';
import { PlayerScore } from '../../src/types/game';

describe('Scoreboard component', () => {
	it('should render the scoreboard with provided data', () => {
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
				restartGame={() => {}}
			/>
		);

		const playerIcons = screen.getAllByAltText(/player icon/i);
		expect(playerIcons.length).toBe(2);

		playerIcons.forEach((icon, index) => expect(icon).toHaveAttribute('src', `/assets/player-${index + 1}.svg`));

		expect(screen.getByText('Player 1')).toBeInTheDocument();
		expect(screen.getByText('Player 2')).toBeInTheDocument();

		expect(screen.getByText('20')).toBeInTheDocument();
		expect(screen.getByText('15')).toBeInTheDocument();
	});
});
