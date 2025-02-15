import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import GameGrid from '../components/GameGrid';
import { gameConfig } from '../data/gameConfig';
import { isValidGridSize, isValidPlayerCount } from '../types/guards';
import { getBoxSidesMap, handleGridLineClick } from '../utils/gameUtils';
import { cn } from '../utils/helpers';
import PlayerCard from '../components/PlayerCard';
import { ChevronIcon } from '../assets/Icons';
import Modal from '../components/Modal';
import Scoreboard from '../components/Scoreboard';
import { GameState, PlayerScore } from '../types/game';

const GameBoard: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [gameState, setGameState] = useState<GameState>({
		selectedLinesToPlayerMap: new Map(),
		capturedBoxesMap: new Map(),
		playerTurn: 1
	});

	const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const data = location.state || {};
	const playerCountData = data.playerCount;
	const gridSizeData = data.gridSize;

	const playerCount = isValidPlayerCount(playerCountData) ? playerCountData : gameConfig.playerCounts[0];
	const gridSize = isValidGridSize(gridSizeData) ? gridSizeData : gameConfig.gridSizes[0];
	const [gridRowCount, gridColCount] = gameConfig.gridSizeMap[gridSize];

	const boxSidesMap = useMemo(() => getBoxSidesMap(gridRowCount, gridColCount), [gridRowCount, gridColCount]);

	const handleLineClick = (lineId: string) => {
		const { selectedLinesToPlayerMap, capturedBoxesMap, playerTurn } = gameState;
		const result = handleGridLineClick(lineId, boxSidesMap, playerCount, {
			selectedLinesToPlayerMap: new Map(selectedLinesToPlayerMap),
			capturedBoxesMap: new Map(capturedBoxesMap),
			playerTurn
		});

		if (!result) return;

		setGameState({
			selectedLinesToPlayerMap: result.selectedLinesToPlayerMap,
			capturedBoxesMap: result.capturedBoxesMap,
			playerTurn: result.playerTurn
		});
	};

	const goBack = () => {
		if (
			gameState.selectedLinesToPlayerMap.size === 0 ||
			gameState.capturedBoxesMap.size === gridRowCount * gridColCount
		) {
			navigate('/');
			return;
		}
		const userConfirm = window.confirm('The game will be lost. Are you sure you want to go back?');
		if (userConfirm) navigate('/');
	};

	const gridStyle = Object.fromEntries(
		Array.from({ length: gameConfig.playerColorsMap.size }, (_, i) => [
			`--player-${i + 1}-color`,
			gameConfig.playerColorsMap.get(i + 1)
		])
	) as React.CSSProperties;

	useEffect(() => {
		const getAllPlayerScores = () =>
			Array.from({ length: playerCount }, (_, index: number) => {
				const playerId = index + 1;
				return {
					playerId,
					playerName: `Player ${playerId}`,
					score: [...gameState.capturedBoxesMap].filter(([_, value]) => value === playerId).length
				};
			}).sort((a, b) => b.score - a.score);
		if (gameState.capturedBoxesMap.size === gridRowCount * gridColCount) {
			setPlayerScores(() => getAllPlayerScores());
			setIsModalOpen(true);
		}
	}, [gameState.capturedBoxesMap.size]);

	const restartGame = () => {
		setGameState({ selectedLinesToPlayerMap: new Map(), capturedBoxesMap: new Map(), playerTurn: 1 });
		setPlayerScores([]);
		setIsModalOpen(false);
	};

	return (
		<>
			<div
				className={cn('game-board', `game-board--${gridSize}`, 'centered-layout ')}
				style={gridStyle}
			>
				<button
					className='game-board__btn-go-back'
					onClick={goBack}
				>
					{ChevronIcon}
				</button>
				<div className='game-board__game-area'>
					<div className='game-board__player-cards-container--top'>
						<PlayerCard
							playerId={1}
							playerName='Player 1'
							isPlayerTurn={gameState.playerTurn === 1}
						/>
						<PlayerCard
							playerId={2}
							playerName='Player 2'
							isPlayerTurn={gameState.playerTurn === 2}
							flipLayout={true}
						/>
					</div>
					<div className='game-board__game-grid-wrapper'>
						<GameGrid
							rowCount={gridRowCount}
							colCount={gridColCount}
							selectedLinesToPlayerMap={gameState.selectedLinesToPlayerMap}
							capturedBoxesMap={gameState.capturedBoxesMap}
							handleLineClick={handleLineClick}
							playerCount={playerCount}
						/>
					</div>
					<div className='game-board__player-cards-container--bottom'>
						{playerCount > 2 && (
							<PlayerCard
								playerId={3}
								playerName='Player 3'
								isPlayerTurn={gameState.playerTurn === 3}
							/>
						)}
						{playerCount > 3 && (
							<PlayerCard
								playerId={4}
								playerName='Player 4'
								isPlayerTurn={gameState.playerTurn === 4}
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
					restartGame={restartGame}
				/>
			</Modal>
		</>
	);
};

export default GameBoard;
