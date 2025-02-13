import { useNavigate } from 'react-router';
import { gameConfig } from '../data/gameConfig';
import { isValidPlayerCount } from '../types/guards';
import { useState } from 'react';
import { cn } from '../utils/helpers';
import { GridSize, PlayerCount } from '../types/game';

const GameSetup: React.FC = () => {
	const [playerCount, setPlayerCount] = useState<PlayerCount>(gameConfig.playerCounts[0]);
	const [gridSize, setGridSize] = useState<GridSize>(gameConfig.gridSizes[0]);
	const navigate = useNavigate();

	return (
		<div className={cn('game-setup', 'centered-layout')}>
			<h1 className='game-setup__title'>Dots and Boxes</h1>
			<div className='game-setup__field'>
				<label htmlFor='player-count'>No of players</label>
				<select
					id='player-count'
					value={playerCount}
					onChange={e => {
						const value = Number(e.target.value);
						if (!isValidPlayerCount(value)) {
							console.error('Invalid player count.');
							return null;
						}
						setPlayerCount(value);
					}}
				>
					{gameConfig.playerCounts.map(count => (
						<option
							key={count}
							value={count}
						>
							{count}
						</option>
					))}
				</select>
			</div>
			<div className='game-setup__field'>
				<span>Select size</span>
				<div className='game-setup__grid-size-options-container'>
					{gameConfig.gridSizes.map(size => (
						<button
							key={size}
							className={cn(
								'btn--tertiary game-setup__btn-grid-size',
								size === gridSize && 'game-setup__btn-grid-size--selected'
							)}
							onClick={() => setGridSize(size)}
						>
							{size}
						</button>
					))}
				</div>
			</div>
			<div className='game-setup__btn-wrapper'>
				<button
					className='btn'
					onClick={() => navigate('/game', { state: { playerCount, gridSize } })}
				>
					Start
				</button>
			</div>
		</div>
	);
};

export default GameSetup;
