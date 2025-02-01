import { useNavigate } from 'react-router';
import { gameConfig } from '../data/gameConfig';
import { useGameContext } from '../hooks/useGameContext';
import { isValidGridSize, isValidPlayerCount } from '../types/guards';

const Home: React.FC = () => {
	const { gridSize, setGridSize, playerCount, setPlayerCount } = useGameContext();
	let navigate = useNavigate();

	return (
		<div>
			<h1>Dots and Boxes</h1>
			<div>
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
			<div>
				<span>Select size</span>
				{gameConfig.gridSizes.map(size => (
					<div key={size}>
						<label htmlFor={`option-${size}`}>{size}</label>
						<input
							type='radio'
							value={size}
							id={`option-${size}`}
							name='gridSize'
							checked={gridSize === size}
							onChange={e => {
								const value = e.target.value;
								if (!isValidGridSize(value)) {
									console.error('Invalid grid size.');
									return null;
								}
								setGridSize(value);
							}}
						/>
					</div>
				))}
			</div>
			<div>
				<button onClick={() => navigate('/game')}>Play</button>
			</div>
		</div>
	);
};

export default Home;
