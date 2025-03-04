import { render, screen } from '@testing-library/react';
import PlayerCard from '../../src/components/PlayerCard';
import { testIds } from '../../src/constants/testIds';

describe('PlayerCard component', () => {
	it('should render the playercard with provided data', () => {
		render(
			<PlayerCard
				playerId={1}
				playerName='Player 1'
			/>
		);

		expect(screen.getByAltText(/player icon/i)).toHaveAttribute('src', '/assets/player-1.svg');
		expect(screen.getByText('Player 1')).toBeInTheDocument();
	});

	it("should apply active styling when it is the player's turn", () => {
		render(
			<PlayerCard
				playerId={1}
				playerName='Player 1'
				isPlayerTurn={true}
			/>
		);
		expect(screen.getByTestId(testIds.PLAYER_CARD)).toHaveClass('player-card--active');
	});

	it("should not apply active styling when it is not the player's turn", () => {
		render(
			<PlayerCard
				playerId={1}
				playerName='Player 1'
			/>
		);
		expect(screen.getByTestId(testIds.PLAYER_CARD)).not.toHaveClass('player-card--active');
	});

	it('should apply disconnected styling when player is disconnected', () => {
		render(
			<PlayerCard
				playerId={1}
				playerName='Player 1'
				isDisconnected={true}
			/>
		);
		expect(screen.getByTestId(testIds.PLAYER_CARD)).toHaveClass('player-card--disconnected');
	});

	it('should not apply disconnected styling when player is not disconnected', () => {
		render(
			<PlayerCard
				playerId={1}
				playerName='Player 1'
				isDisconnected={false}
			/>
		);
		expect(screen.getByTestId(testIds.PLAYER_CARD)).not.toHaveClass('player-card--disconnected');
	});
});
