import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import GameGrid from '../../components/GameGrid';
import { gameConfig } from '../../constants/gameConfig';
import { isValidGridSize, isValidPlayerCount } from '../../types/guards';
import { getBoxSides, getIntersectingBoxIds, getPlayerId } from '../../utils/gameUtils';
import { cn } from '../../utils/helpers';
import PlayerCard from '../../components/PlayerCard';
import Modal from '../../components/Modal';
import Scoreboard from '../../components/Scoreboard';
import { GameState, GameStateServer, PlayerScore, SavedGameProgress } from '../../types/game';
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
		if (!gameStateServer || !socket) return;
		if (gameStateClient.selectedLinesToPlayerMap.has(lineId)) return;
		if (gameStateServer.nextMove !== playerId) return;

		const selectedLinesToPlayerMap = new Map(gameStateClient.selectedLinesToPlayerMap);
		const capturedBoxesMap = new Map(gameStateClient.capturedBoxesMap);

		const newlyCapturedBoxes: { id: string; by: string }[] = [];

		selectedLinesToPlayerMap.set(lineId, playerId);

		let hasCapturedNewBox: boolean = false;
		const boxIds = getIntersectingBoxIds(lineId, gridRowCount, gridColCount);

		boxIds.forEach(boxId => {
			const sides = getBoxSides(boxId);

			const allSelected = sides.every(side => selectedLinesToPlayerMap.has(side));
			if (!allSelected) return;

			if (capturedBoxesMap.has(boxId)) return;
			capturedBoxesMap.set(boxId, playerId);
			newlyCapturedBoxes.push({ id: boxId, by: playerId });
			hasCapturedNewBox = true;
		});

		setGameStateClient({
			selectedLinesToPlayerMap,
			capturedBoxesMap
		});

		let nextMove: string = gameStateServer.nextMove;

		if (!hasCapturedNewBox) {
			let playerIndex = gameStateServer.players.findIndex(pl => pl.playerId === playerId);

			if (playerIndex === -1) {
				setPopupAlert({
					show: true,
					title: 'Error',
					body: 'An unexpected error occurred. Try refreshing the page.'
				});
				return;
			}
			let switched: boolean = false;
			while (!switched) {
				playerIndex += 1;
				if (playerIndex >= gameStateServer.players.length) {
					playerIndex = 0;
				}
				const player = gameStateServer.players[playerIndex];
				if (player.isConnected) {
					nextMove = player.playerId;
					switched = true;
				}
			}
		}

		socket.emit('room:game:move', {
			selectedLine: { id: lineId, by: playerId },
			capturedBoxes: newlyCapturedBoxes,
			nextMove,
			isLastMove: capturedBoxesMap.size === gridRowCount * gridColCount
		});
	};

	const onPlayAgain = () => {
		if (!socket || !gameStateServer) return;

		const player = gameStateServer.players.find(pl => pl.playerId === playerId);
		if (!player) return;

		socket.emit('room:rejoin', { playerId, playerName: player.playerName, roomId: gameStateServer.roomId });
	};

	useEffect(() => {
		if (!gameStateServer) return;

		const getAllPlayerScores = () =>
			gameStateServer.players
				.map((pl, i) => ({
					playerId: i + 1,
					playerName: pl.playerName,
					score: [...gameStateClient.capturedBoxesMap].filter(([, value]) => value === pl.playerId).length
				}))
				.sort((a, b) => b.score - a.score);

		if (gameStateClient.capturedBoxesMap.size === gridRowCount * gridColCount) {
			setPlayerScores(() => getAllPlayerScores());
			setIsModalOpen(true);
		}
	}, [gridRowCount, gridColCount, gameStateServer, gameStateClient.capturedBoxesMap]);

	useEffect(() => {
		if (!socket) return;

		const handleReconnect = () => {
			if (!socket) return;
			if (!gameStateServer) return;
			const player = gameStateServer.players.find(pl => pl.playerId === playerId);
			if (!player) {
				redirectOnline();
				return;
			}

			socket.emit('room:game:reconnect', {
				playerId,
				playerName: player.playerName,
				roomId: gameStateServer.roomId
			});
		};

		const updateReconnectAck = (data: { gameState: GameStateServer; savedGameProgress: SavedGameProgress }) => {
			const { gameState, savedGameProgress } = data;
			setGameStateServer(gameState);
			setGameStateClient({
				selectedLinesToPlayerMap: new Map(savedGameProgress.selectedLines),
				capturedBoxesMap: new Map(savedGameProgress.capturedBoxes)
			});
		};

		const handleRoomRejoinAck = (gameStateServer: GameStateServer) =>
			navigate('/pre-game', { state: { gameStateServer }, replace: true });

		const updateGameStateServer = (gameStateServer: GameStateServer) => setGameStateServer(gameStateServer);

		const handleGameUpdateBoard = (data: {
			selectedLine: {
				id: string;
				by: string;
			};
			capturedBoxes: {
				id: string;
				by: string;
			}[];
			gameState: GameStateServer;
		}) => {
			if (!gameStateServer || !socket) return;

			const { selectedLine, capturedBoxes, gameState } = data;
			setGameStateServer(gameState);

			setGameStateClient(p => {
				const selectedLinesToPlayerMap = new Map(p.selectedLinesToPlayerMap);
				const capturedBoxesMap = new Map(p.capturedBoxesMap);

				selectedLinesToPlayerMap.set(selectedLine.id, selectedLine.by);
				capturedBoxes.forEach(box => capturedBoxesMap.set(box.id, box.by));
				return {
					selectedLinesToPlayerMap: selectedLinesToPlayerMap,
					capturedBoxesMap: capturedBoxesMap
				};
			});
		};

		const handleError = () => redirectOnline();

		socket.on('connect', handleReconnect);
		socket.on('reconnect ', handleReconnect);
		socket.on('room:game:reconnect:ack', updateReconnectAck);
		socket.on('room:rejoin:ack', handleRoomRejoinAck);

		socket.on('room:update:state', updateGameStateServer);

		socket.on('room:game:updateBoard', handleGameUpdateBoard);
		socket.on('error', handleError);

		return () => {
			socket.off('connect', handleReconnect);
			socket.off('reconnect ', handleReconnect);
			socket.off('room:game:reconnect:ack', updateReconnectAck);
			socket.off('room:rejoin:ack', handleRoomRejoinAck);

			socket.off('room:update:state', updateGameStateServer);

			socket.off('room:game:updateBoard', handleGameUpdateBoard);
			socket.off('error', handleError);
		};
	}, [socket, gameStateServer, navigate, playerId, redirectOnline, gameStateClient, gridRowCount, gridColCount]);

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
							isPlayerTurn={gameStateServer.nextMove === gameStateServer.players[0].playerId}
						/>
						<PlayerCard
							playerId={2}
							playerName={gameStateServer.players[1].playerName}
							isPlayerTurn={gameStateServer.nextMove === gameStateServer.players[1].playerId}
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
								isPlayerTurn={gameStateServer.nextMove === gameStateServer.players[2].playerId}
							/>
						)}
						{playerCount > 3 && (
							<PlayerCard
								playerId={4}
								playerName={gameStateServer.players[3].playerName}
								isPlayerTurn={gameStateServer.nextMove === gameStateServer.players[3].playerId}
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
