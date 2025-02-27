import { useEffect, useMemo, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useLocation, useNavigate } from 'react-router';
import { GameStateServer } from '../../types/game';
import PopupAlert from '../../components/PopupAlert';
import PrevPageBtn from '../../components/PrevPageBtn';
import { AddIcon } from '../../assets/Icons';
import { getPlayerId } from '../../utils/gameUtils';

const PreGame: React.FC = () => {
	const socket = useSocket();
	const navigate = useNavigate();
	const location = useLocation();
	const playerId = useMemo(() => getPlayerId(), []);

	const [gameStateServer, setGameStateServer] = useState<GameStateServer | null>(
		location.state?.gameStateServer || null
	);
	const [isStartGameDisabled, setIsStartGameDisabled] = useState<boolean>(true);

	const [popupAlert, setPopupAlert] = useState<{
		show: boolean;
		title: string;
		body: string;
		hideCloseButton?: boolean;
		confirmBtnText?: string;
		onConfirm?: () => void;
	}>({
		show: false,
		title: '',
		body: ''
	});

	const leaveRoom = () => {
		if (!socket) return;

		socket.emit('room:leave');
		navigate('/online', { replace: true });
	};

	const kickPlayer = (targetPlayerId: string) => {
		if (!socket) return;

		socket.emit('room:kick', { targetPlayerId });
	};

	const startGame = () => {
		if (!socket) return;
		socket.emit('room:game:start');
	};

	useEffect(() => {
		if (!gameStateServer) {
			setIsStartGameDisabled(true);
			return;
		}

		if (gameStateServer.players.length < 2) setIsStartGameDisabled(true);
		else setIsStartGameDisabled(false);
	}, [gameStateServer]);

	useEffect(() => {
		if (!socket) return;

		const handleExitRoom = () => navigate('/online', { replace: true });

		const updateGameStateServer = (gameStateServer: GameStateServer) => setGameStateServer(gameStateServer);

		const handleKicked = () =>
			setPopupAlert({
				show: true,
				title: 'Kicked Out',
				body: 'You are kicked by the host.',
				hideCloseButton: true,
				onConfirm: () => navigate('/online', { replace: true })
			});

		const handleGameStarted = (gameStateServer: GameStateServer) =>
			navigate('/online/play', { state: { gameStateServer } });

		socket.on('connect', handleExitRoom);
		socket.on('reconnect ', handleExitRoom);
		socket.on('disconnect', handleExitRoom);

		socket.on('room:update:state', updateGameStateServer);

		socket.on('room:kicked', handleKicked);

		socket.on('room:game:started', handleGameStarted);

		return () => {
			socket.off('connect', handleExitRoom);
			socket.off('reconnect ', handleExitRoom);
			socket.off('disconnect', handleExitRoom);

			socket.off('room:update:state', updateGameStateServer);

			socket.off('room:kicked', handleKicked);

			socket.off('room:game:started', handleGameStarted);
		};
	}, [socket, gameStateServer, navigate, playerId]);

	useEffect(() => {
		if (!socket) return;
		const handleEvent = () => navigate('/online', { replace: true });

		socket.on('error', handleEvent);
		return () => {
			socket.off('error', handleEvent);
		};
	}, [navigate, socket]);

	if (!gameStateServer) return null;

	return (
		<div className='pre-game'>
			<PrevPageBtn
				goPrevPage={() =>
					setPopupAlert({
						show: true,
						title: 'Leave',
						body: 'Are you sure you want to leave the room?',
						confirmBtnText: 'Leave',
						onConfirm: leaveRoom
					})
				}
			/>
			<h1 className='title'>Room (ID: {gameStateServer.roomId})</h1>

			<div className='pre-game__players-list'>
				{gameStateServer.players.map(player => {
					return (
						<div
							className='pre-game__player'
							key={player.playerId}
						>
							<p>
								{player.playerName}
								<span className='pre-game__player--is-host'>
									{gameStateServer.host === player.playerId && ' ( host )'}
								</span>
							</p>
							{gameStateServer.host === playerId && player.playerId !== playerId && (
								<button
									className='pre-game__btn-kick'
									onClick={() => kickPlayer(player.playerId)}
								>
									{AddIcon}
								</button>
							)}
						</div>
					);
				})}
			</div>
			{gameStateServer.host !== playerId && <div className='pre-game__waiting-message'>Waiting for host...</div>}

			{gameStateServer.host === playerId && (
				<div className='main-btn-wrapper'>
					<button
						className='btn pre-game__btn-start'
						onClick={startGame}
						disabled={isStartGameDisabled}
					>
						Start Game
					</button>
				</div>
			)}
			<PopupAlert
				isOpen={popupAlert.show}
				onClose={() => setPopupAlert(p => ({ ...p, show: false }))}
				title={popupAlert.title}
				body={popupAlert.body}
				hideCloseButton={popupAlert.hideCloseButton}
				confirmBtnText={popupAlert.confirmBtnText}
				onConfirm={popupAlert.onConfirm}
			/>
		</div>
	);
};

export default PreGame;
