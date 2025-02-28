import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import GameGrid from '../../components/GameGrid';
import { gameConfig } from '../../constants/gameConfig';
import { isValidGridSize, isValidPlayerCount } from '../../types/guards';
import { getBoxSidesMap, getPlayerId, handleGridLineClick } from '../../utils/gameUtils';
import { cn } from '../../utils/helpers';
import PlayerCard from '../../components/PlayerCard';
import Modal from '../../components/Modal';
import Scoreboard from '../../components/Scoreboard';
import { GameState, GameStateServer, PlayerScore } from '../../types/game';
import PrevPageBtn from '../../components/PrevPageBtn';
import { useSocket } from '../../hooks/useSocket';
import PopupAlert from '../../components/PopupAlert';

const GameBoard: React.FC = () => {
	const socket = useSocket();
	const location = useLocation();
	const navigate = useNavigate();
	const playerId = useMemo(() => getPlayerId(), []);

	const [gameStateClient, setGameStateClient] = useState<Omit<GameState<string>, 'playerTurn'>>({
		selectedLinesToPlayerMap: new Map(),
		capturedBoxesMap: new Map()
	});
	const [gameStateServer, setGameStateServer] = useState<GameStateServer | null>(
		location.state?.gameStateServer || null
	);
	const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

	const gridSizeData = gameStateServer ? gameStateServer.gridSize : gameConfig.gridSizes[0];
	const playerCountData = gameStateServer ? gameStateServer.players.length : gameConfig.playerCounts[0];

	const playerCount = isValidPlayerCount(playerCountData) ? playerCountData : gameConfig.playerCounts[0];
	const gridSize = isValidGridSize(gridSizeData) ? gridSizeData : gameConfig.gridSizes[0];
	const [gridRowCount, gridColCount] = gameConfig.gridSizeMap[gridSize];

	const boxSidesMap = useMemo(() => getBoxSidesMap(gridRowCount, gridColCount), [gridRowCount, gridColCount]);

	const redirectOnline = useCallback(() => navigate('/online', { replace: true }), [navigate]);

	const playerColorsMap = useMemo(() => {
		const newMap: Map<string, string> = new Map();
		if (!gameStateServer) return newMap;

		gameStateServer.players.forEach((pl, index) => {
			const color = gameConfig.playerColorsMap.get(index + 1);
			newMap.set(pl.playerId, color ?? '');
		});

		return newMap;
	}, [gameStateServer]);

	const handleLineClick = (lineId: string) => {
		if (!gameStateServer) return;
		if (!socket) return;

		const { selectedLinesToPlayerMap } = gameStateClient;
		if (selectedLinesToPlayerMap.has(lineId)) return;

		if (gameStateServer.currentMove !== playerId) return;

		// socket.emit('room:game:move', { selectedGridLine, shouldSwitchPlayer, isLastMove });

		// const result = handleGridLineClick(
		// 	lineId,
		// 	new Map(selectedLinesToPlayerMap),
		// 	new Map(capturedBoxesMap),
		// 	boxSidesMap,
		// 	gameStateServer.currentMove
		// );

		// if (!result) return;

		// setGameStateClient({
		// 	selectedLinesToPlayerMap: result.selectedLinesToPlayerMap,
		// 	capturedBoxesMap: result.capturedBoxesMap
		// });
	};

	const onPlayAgain = () => {
		if (!socket) return;
		if (!gameStateServer) return;

		const player = gameStateServer?.players.find(pl => pl.playerId === playerId);
		if (!player) return;

		socket.emit('room:rejoin', { playerId, playerName: player.playerName, roomId: gameStateServer.roomId });
	};

	useEffect(() => {
		if (!socket) return;

		const handleReconnect = () => {
			if (!socket) return;

			if (!gameStateServer) return;

			const player = gameStateServer?.players.find(pl => pl.playerId === playerId);
			if (!player) return;

			socket.emit('room:game:reconnect', {
				playerId,
				playerName: player.playerName,
				roomId: gameStateServer.roomId
			});
		};

		const updateGameStateServer = (gameStateServer: GameStateServer) => setGameStateServer(gameStateServer);

		const handleGameUpdateBoard = () => {
			/*


            */
		};

		socket.on('connect', handleReconnect);
		socket.on('reconnect ', handleReconnect);
		socket.on('room:game:reconnect:ack', updateGameStateServer);

		socket.on('room:update:state', updateGameStateServer);

		socket.on('room:game:updateBoard', handleGameUpdateBoard);

		return () => {
			socket.off('connect', handleReconnect);
			socket.off('reconnect ', handleReconnect);
			socket.off('room:game:reconnect:ack', updateGameStateServer);

			socket.off('room:update:state', updateGameStateServer);

			socket.off('room:game:updateBoard', handleGameUpdateBoard);
		};
	}, [socket, gameStateServer, navigate, playerId, redirectOnline]);

	useEffect(() => {
		if (!socket) return;
		const handleEvent = () => redirectOnline();

		socket.on('error', handleEvent);
		return () => {
			socket.off('error', handleEvent);
		};
	}, [navigate, socket, redirectOnline]);

	if (!gameStateServer) return null;

	return (
		<>
			<div className={cn('game-board', `game-board--${gridSize}`)}>
				<PrevPageBtn
					goPrevPage={() =>
						setPopupAlert({
							show: true,
							title: 'Leave Game',
							body: 'Are you sure you want to leave the game?',
							confirmBtnText: 'Leave',
							onConfirm: () => {
								if (!socket) return;

								socket.emit('room:game:leave');
								redirectOnline();
							}
						})
					}
				/>
				<div className='game-board__game-area'>
					<div className='game-board__player-cards-container--top'>
						<PlayerCard
							playerId={1}
							playerName={gameStateServer.players[0].playerName}
							isPlayerTurn={gameStateServer.currentMove === gameStateServer.players[0].playerId}
						/>
						<PlayerCard
							playerId={2}
							playerName={gameStateServer.players[1].playerName}
							isPlayerTurn={gameStateServer.currentMove === gameStateServer.players[1].playerId}
							flipLayout={true}
						/>
					</div>
					<div className='game-board__game-grid-wrapper'>
						<GameGrid
							rowCount={gridRowCount}
							colCount={gridColCount}
							selectedLinesToPlayerMap={gameStateClient.selectedLinesToPlayerMap}
							capturedBoxesMap={gameStateClient.capturedBoxesMap}
							handleLineClick={handleLineClick}
							playerColorsMap={playerColorsMap}
						/>
					</div>
					<div className='game-board__player-cards-container--bottom'>
						{gameStateServer.players.length > 2 && (
							<PlayerCard
								playerId={3}
								playerName={gameStateServer.players[2].playerName}
								isPlayerTurn={gameStateServer.currentMove === gameStateServer.players[2].playerId}
							/>
						)}
						{playerCount > 3 && (
							<PlayerCard
								playerId={4}
								playerName={gameStateServer.players[3].playerName}
								isPlayerTurn={gameStateServer.currentMove === gameStateServer.players[3].playerId}
								flipLayout={true}
							/>
						)}
					</div>
				</div>
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			>
				<Scoreboard
					playerScores={playerScores}
					onPlayAgain={onPlayAgain}
					onLeave={redirectOnline}
				/>
			</Modal>
			<PopupAlert
				isOpen={popupAlert.show}
				onClose={() => setPopupAlert(p => ({ ...p, show: false }))}
				title={popupAlert.title}
				body={popupAlert.body}
				hideCloseButton={popupAlert.hideCloseButton}
				confirmBtnText={popupAlert.confirmBtnText}
				onConfirm={popupAlert.onConfirm}
			/>
		</>
	);
};

export default GameBoard;
