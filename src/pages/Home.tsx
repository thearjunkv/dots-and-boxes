import { useNavigate } from 'react-router';
import { gameConfig } from '../data/gameConfig';
import { isValidPlayerCount } from '../types/guards';
import { useEffect, useState } from 'react';
import { cn } from '../utils/helpers';
import { GridSize, PlayerCount } from '../types/game';

const Home: React.FC = () => {
	const [playerCount, setPlayerCount] = useState<PlayerCount>(gameConfig.playerCounts[0]);
	const [gridSize, setGridSize] = useState<GridSize>(gameConfig.gridSizes[0]);
	const navigate = useNavigate();

	useEffect(() => {
		document.body.addEventListener('keydown', () => {
			console.log(document.activeElement);
		});
	}, []);
	return (
		<div className='home'>
			<h1 className='home__title'>Dots and Boxes</h1>
			<div className='home__input-wrapper'>
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
			<div className='home__input-wrapper'>
				<span>Select size</span>
				<div className='home__grid-size-options-wrapper'>
					{gameConfig.gridSizes.map(size => (
						<button
							key={size}
							className={cn(size === gridSize && 'selected')}
							onClick={() => setGridSize(size)}
						>
							{size}
						</button>
					))}
				</div>
			</div>
			<div className='home__footer'>
				<button onClick={() => navigate('/game', { state: { playerCount, gridSize } })}>Start</button>
			</div>
		</div>
	);
};

export default Home;
