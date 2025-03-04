import { DisconnectedIcon } from '../assets/Icons';
import { testIds } from '../constants/testIds';
import { cn } from '../utils/helpers';
import { getTestId } from '../utils/testUtils';

type PlayerCardProps = {
	playerId: number;
	playerName: string;
	isPlayerTurn?: boolean;
	isDisconnected?: boolean;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ playerId, playerName, isPlayerTurn, isDisconnected }) => {
	const playerIconPath = `/assets/player-${playerId}.svg`;

	return (
		<div
			className={cn(
				'player-card',
				isPlayerTurn && 'player-card--active',
				isDisconnected && 'player-card--disconnected'
			)}
			data-testid={getTestId(testIds.PLAYER_CARD)}
		>
			<div className='player-card__player-icon-wrapper'>
				<img
					src={playerIconPath}
					alt='Player Icon'
					className='player-card__player-icon'
				/>
			</div>
			<div className='player-card__player-name'>{playerName}</div>
			<div className='player-card__icon-disconnected'>{DisconnectedIcon}</div>
		</div>
	);
};

export default PlayerCard;
