import { useEffect, useState } from 'react';
import { GameStateServer, GridSize } from '../../types/game';
import { gameConfig } from '../../constants/gameConfig';
import { cn } from '../../utils/helpers';
import { useSocket } from '../../hooks/useSocket';
import { createPlayerId } from '../../utils/gameUtils';
import { useNavigate } from 'react-router';

const CreateRoom: React.FC = () => {
	const [gridSize, setGridSize] = useState<GridSize>(gameConfig.gridSizes[0]);
	const [playerName, setPlayerName] = useState<string>('');
	const [errors, setErrors] = useState<{ playerName: string }>({ playerName: '' });

	const navigate = useNavigate();
	const socket = useSocket();

	const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		let error = '';

		if (value.trim() === '') error = 'Player name is required';
		else if (value.length > 8) error = 'Player name should be max 8 characters.';

		setErrors({ playerName: error });
		setPlayerName(value);
	};

	const createRoom = () => {
		if (errors.playerName.length > 0) return;

		const playerId = createPlayerId();
		socket?.emit('room:create', { playerId, playerName, gridSize });
	};

	useEffect(() => {
		if (!socket) return;
		const handleEvent = (gameState: GameStateServer) => {
			navigate('/online/pre-game', { state: { gameState } });
		};
		socket.on('room:create:ack', handleEvent);

		return () => {
			socket.off('room:create:ack', handleEvent);
		};
	}, [navigate, socket]);

	return (
		<>
			<div className='input-field'>
				<label>Player name</label>
				<input
					type='text'
					name='playerName'
					value={playerName}
					onChange={handlePlayerNameChange}
				/>
				{errors.playerName.length > 0 && <span className='input-field__error'>{errors.playerName}</span>}
			</div>
			<div className='input-field'>
				<span className='input-field__label'>Select size</span>
				<div className='grid-size-options-container'>
					{gameConfig.gridSizes.map(size => (
						<button
							key={size}
							className={cn(
								'btn--tertiary btn-grid-size',
								size === gridSize && 'btn-grid-size--selected'
							)}
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
					onClick={createRoom}
				>
					Create Room
				</button>
			</div>
		</>
	);
};

export default CreateRoom;
