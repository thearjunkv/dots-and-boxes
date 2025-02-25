import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { getPlayerId } from '../../utils/gameUtils';
import { useNavigate } from 'react-router';
import { GameStateServer } from '../../types/game';
import PopupAlert from '../../components/PopupAlert';

const JoinRoom: React.FC = () => {
	const [playerName, setPlayerName] = useState<string>('');
	const [roomId, setRoomId] = useState<string>('');
	const [errors, setErrors] = useState<{ playerName: string; roomId: string }>({
		playerName: '',
		roomId: ''
	});
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

		setErrors(p => ({ ...p, playerName: error }));
		return { hasError: error.length > 0 };
	};

	const validateRoomId = (value: string) => {
		let error = '';

		if (value.trim() === '') error = 'Room ID is required';

		setErrors(p => ({ ...p, roomId: error }));
		return { hasError: error.length > 0 };
	};

	const joinRoom = () => {
		if (validatePlayerName(playerName).hasError || validateRoomId(roomId).hasError) return;

		const playerId = getPlayerId();
		socket?.emit('room:join', { playerId, playerName, roomId });
	};

	useEffect(() => {
		if (!socket) return;
		const handleEvent = (gameStateServer: GameStateServer) => {
			navigate('/online/pre-game', { state: { gameStateServer } });
		};
		socket.on('room:join:ack', handleEvent);

		return () => {
			socket.off('room:join:ack', handleEvent);
		};
	}, [navigate, socket]);

	useEffect(() => {
		if (!socket) return;
		const handleEvent = (data: { message: string }) => {
			let body: string;
			const { message } = data;
			if (message === 'ROOM_NOT_FOUND') body = 'Room not found.';
			else body = 'Unable to join room.';
			setPopupAlert({ show: true, title: 'Action Failed', body });
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
				<label>Room ID</label>
				<input
					type='text'
					name='roomId'
					value={roomId}
					onChange={e => {
						const value = e.target.value;
						validateRoomId(value);
						setRoomId(value);
					}}
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
			<PopupAlert
				isOpen={popupAlert.show}
				onClose={() => setPopupAlert(p => ({ ...p, show: false }))}
				title={popupAlert.title}
				body={popupAlert.body}
			/>
		</>
	);
};

export default JoinRoom;
