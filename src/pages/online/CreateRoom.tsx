import { useEffect, useState } from 'react';
import { GameStateServer, GridSize } from '../../types/game';
import { gameConfig } from '../../constants/gameConfig';
import { cn } from '../../utils/helpers';
import { useSocket } from '../../hooks/useSocket';
import { createPlayerId } from '../../utils/gameUtils';
import { useNavigate } from 'react-router';
import PopupAlert from '../../components/PopupAlert';

const CreateRoom: React.FC = () => {
	const [gridSize, setGridSize] = useState<GridSize>(gameConfig.gridSizes[0]);
	const [playerName, setPlayerName] = useState<string>('');
	const [errors, setErrors] = useState<{ playerName: string }>({ playerName: '' });

	const [popupAlert, setPopupAlert] = useState<{
		show: boolean;
		title: string;
		body: string;
	}>({
		show: false,
		title: '',
		body: ''
	});

	const navigate = useNavigate();
	const socket = useSocket();

	const validatePlayerName = (value: string) => {
		let error = '';

		if (value.trim() === '') error = 'Player name is required';
		else if (value.length > 8) error = 'Player name should be max 8 characters.';

		setErrors({ playerName: error });
		return { hasError: error.length > 0 };
	};

	const createRoom = () => {
		if (validatePlayerName(playerName).hasError) return;

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

	useEffect(() => {
		if (!socket) return;
		const handleEvent = () => {
			setPopupAlert({ show: true, title: 'Action Failed', body: 'Failed to create room.' });
		};
		socket.on('error', handleEvent);

		return () => {
			socket.off('error', handleEvent);
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
					onChange={e => {
						const value = e.target.value;
						validatePlayerName(value);
						setPlayerName(value);
					}}
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
			<PopupAlert
				isOpen={popupAlert.show}
				onClose={() => setPopupAlert(p => ({ ...p, show: false }))}
				title={popupAlert.title}
				body={popupAlert.body}
			/>
		</>
	);
};

export default CreateRoom;
