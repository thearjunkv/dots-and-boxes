import { cn } from '../utils/helpers';

type PlayerCardProps = {
	playerId: number;
	playerName?: string;
	isPlayerTurn: boolean;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ playerId, playerName, isPlayerTurn }) => {
	const defaultPlayerName = `Player ${playerId}`;
	const displayPlayerName = playerName?.trim() ? playerName : defaultPlayerName;

	const playerIconPath = `/assets/player-${playerId}.svg`;

	return (
		<div className={cn('player-card', isPlayerTurn && `player-card--active`)}>
			<div className='player-card__player-icon-wrapper'>
				<img
					src={playerIconPath}
					alt='Player Icon'
					className='player-card__player-icon'
				/>
			</div>
			<div className='player-card__player-name'>{displayPlayerName}</div>
		</div>
	);
};

export default PlayerCard;
