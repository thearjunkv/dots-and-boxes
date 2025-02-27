import { useNavigate } from 'react-router';
import { gameConfig } from '../../constants/gameConfig';
import { isValidPlayerCount } from '../../types/guards';
import { useState } from 'react';
import { cn } from '../../utils/helpers';
import { GridSize, PlayerCount } from '../../types/game';
import PrevPageBtn from '../../components/PrevPageBtn';

const SetupGame: React.FC = () => {
	const [playerCount, setPlayerCount] = useState<PlayerCount>(gameConfig.playerCounts[0]);
	const [gridSize, setGridSize] = useState<GridSize>(gameConfig.gridSizes[0]);
	const navigate = useNavigate();

	return (
		<div className='setup-game'>
			<PrevPageBtn goPrevPage={() => navigate('/', { replace: true })} />
			<h1 className='title'>Create Game</h1>
			<div className='input-field'>
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
			<div className='input-field'>
				<span className='input-field__label'>Select size</span>
				<div className='grid-size-options-container'>
					{gameConfig.gridSizes.map(size => (
						<button
							key={size}
							className={cn('btn btn-grid-size', size === gridSize && 'btn-grid-size--selected')}
							onClick={() => setGridSize(size)}
						>
							{size}
						</button>
					))}
				</div>
			</div>
			<div className='main-btn-wrapper'>
				<button
					className='btn'
					onClick={() => navigate('/offline/play', { state: { playerCount, gridSize } })}
				>
					Start
				</button>
			</div>
		</div>
	);
};

export default SetupGame;
