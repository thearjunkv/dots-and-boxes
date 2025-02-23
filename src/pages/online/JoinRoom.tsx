import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { createPlayerId } from '../../utils/gameUtils';
import { useNavigate } from 'react-router';
import { GameStateServer } from '../../types/game';

const JoinRoom: React.FC = () => {
	const [playerName, setPlayerName] = useState<string>('');
	const [roomId, setRoomId] = useState<string>('');
	const [errors, setErrors] = useState<{ playerName: string; roomId: string }>({
		playerName: '',
		roomId: ''
	});
	const navigate = useNavigate();
	const socket = useSocket();

	const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		let error: string = '';

		if (value.trim() === '') error = 'Player name is required';
		else if (value.length > 8) error = 'Player name cannot exceed 8 characters';

		setErrors(p => ({ ...p, playerName: error }));
		setPlayerName(value);
	};

	const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		let error: string = '';

		if (value.trim() === '') error = 'Room ID is required';

		setErrors(p => ({ ...p, roomId: error }));
		setRoomId(value);
	};

	const joinRoom = () => {
		if (errors.playerName.length > 0 || errors.roomId.length > 0) return;

		const playerId = createPlayerId();
		socket?.emit('room:join', { playerId, playerName, roomId });
	};

	useEffect(() => {
		if (!socket) return;
		const handleEvent = (gameState: GameStateServer) => {
			navigate('/online/pre-game', { state: { gameState } });
		};
		socket.on('room:join:ack', handleEvent);

		return () => {
			socket.off('room:join:ack', handleEvent);
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
				<label>Room ID</label>
				<input
					type='text'
					name='roomId'
					value={roomId}
					onChange={handleRoomIdChange}
				/>
				{errors.roomId.length > 0 && <span className='input-field__error'>{errors.roomId}</span>}
			</div>

			<div className='main-btn-wrapper'>
				<button
					className='btn'
					onClick={joinRoom}
				>
					Join Room
				</button>
			</div>
		</>
	);
};

export default JoinRoom;
