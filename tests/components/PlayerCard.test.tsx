import { render, screen } from '@testing-library/react';
import PlayerCard from '../../src/components/PlayerCard';

describe('PlayerCard component', () => {
	it('should be in the document with player info', () => {
		render(
			<PlayerCard
				playerId={1}
				playerName='Player 1'
				isPlayerTurn={false}
			/>
		);
		const playerCard = screen.getByAltText(/player Icon/i);

		expect(playerCard).toHaveAttribute('src', '/assets/player-1.svg');
		expect(screen.getByText('Player 1')).toBeInTheDocument();
	});

	it("should be active when it's the player's turn", () => {
		render(
			<PlayerCard
				playerId={1}
				playerName='Player 1'
				isPlayerTurn={true}
			/>
		);
		const playerCard = screen.getByTestId('player-card');
		expect(playerCard).toHaveClass('player-card--active');
	});

	it('should be flipped when flipLayout is set to true', () => {
		render(
			<PlayerCard
				playerId={1}
				playerName='Player 1'
				isPlayerTurn={false}
				flipLayout={true}
			/>
		);
		const playerCard = screen.getByTestId('player-card');
		expect(playerCard).toHaveClass('player-card--flip-layout');
	});
});
