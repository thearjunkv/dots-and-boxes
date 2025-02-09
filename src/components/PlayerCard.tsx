import { cn } from '../utils/helpers';
import { getTestId } from '../utils/testUtils';

type PlayerCardProps = {
	playerId: number;
	playerName: string;
	isPlayerTurn: boolean;
	flipLayout?: boolean;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ playerId, playerName, isPlayerTurn, flipLayout }) => {
	const playerIconPath = `/assets/player-${playerId}.svg`;

	return (
		<div
			className={cn(
				'player-card',
				isPlayerTurn && 'player-card--active',
				flipLayout && 'player-card--flip-layout'
			)}
			data-testid={getTestId('player-card')}
		>
			<div className='player-card__player-icon-wrapper'>
				<img
					src={playerIconPath}
					alt='Player Icon'
					className='player-card__player-icon'
				/>
			</div>
			<div className='player-card__player-name'>{playerName}</div>
		</div>
	);
};

export default PlayerCard;
