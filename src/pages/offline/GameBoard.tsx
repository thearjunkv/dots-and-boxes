import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import GameGrid from '../../components/GameGrid';
import { gameConfig } from '../../constants/gameConfig';
import { isValidGridSize, isValidPlayerCount } from '../../types/guards';
import { handleGridLineClick } from '../../utils/gameUtils';
import { cn } from '../../utils/helpers';
import PlayerCard from '../../components/PlayerCard';
import Scoreboard from '../../components/Scoreboard';
import { GameState, PlayerScore } from '../../types/game';
import PrevPageBtn from '../../components/PrevPageBtn';

const GameBoard: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [gameState, setGameState] = useState<GameState<number>>({
		selectedLinesToPlayerMap: new Map(),
		capturedBoxesMap: new Map(),
		playerTurn: 1
	});

	const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);

	const [showScoreboard, setShowScoreboard] = useState<boolean>(false);

	const data = location.state || {};
	const playerCountData = data.playerCount;
	const gridSizeData = data.gridSize;

	const playerCount = isValidPlayerCount(playerCountData) ? playerCountData : gameConfig.playerCounts[0];
	const gridSize = isValidGridSize(gridSizeData) ? gridSizeData : gameConfig.gridSizes[0];
	const [gridRowCount, gridColCount] = gameConfig.gridSizeMap[gridSize];

	const handleLineClick = (lineId: string) => {
		const { selectedLinesToPlayerMap, capturedBoxesMap, playerTurn } = gameState;
		const result = handleGridLineClick(
			gridRowCount,
			gridColCount,
			lineId,
			new Map(selectedLinesToPlayerMap),
			new Map(capturedBoxesMap),
			playerTurn
		);

		if (!result) return;

		setGameState({
			selectedLinesToPlayerMap: result.selectedLinesToPlayerMap,
			capturedBoxesMap: result.capturedBoxesMap,
			playerTurn: result.hasCapturedNewBox ? playerTurn : playerTurn >= playerCount ? 1 : playerTurn + 1
		});
	};

	const goBack = () => {
		if (
			gameState.selectedLinesToPlayerMap.size === 0 ||
			gameState.capturedBoxesMap.size === gridRowCount * gridColCount
		) {
			navigate('/offline', { replace: true });
			return;
		}
		const userConfirm = window.confirm('The game will be lost. Are you sure you want to go back?');
		if (userConfirm) navigate('/offline', { replace: true });
	};

	useEffect(() => {
		const getAllPlayerScores = () =>
			Array.from({ length: playerCount }, (_, index: number) => {
				const playerId = index + 1;
				return {
					playerId,
					playerName: `Player ${playerId}`,
					score: [...gameState.capturedBoxesMap].filter(([, value]) => value === playerId).length
				};
			}).sort((a, b) => b.score - a.score);
		if (gameState.capturedBoxesMap.size === gridRowCount * gridColCount) {
			setPlayerScores(() => getAllPlayerScores());
			setShowScoreboard(true);
		}
	}, [gameState.capturedBoxesMap, gridRowCount, gridColCount, playerCount]);

	const onPlayAgain = () => {
		setShowScoreboard(false);
		setGameState({ selectedLinesToPlayerMap: new Map(), capturedBoxesMap: new Map(), playerTurn: 1 });
	};

	return (
		<>
			<div className={cn('game-board', `game-board--${gridSize}`)}>
				<PrevPageBtn goPrevPage={goBack} />
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
							playerColorsMap={gameConfig.playerColorsMap}
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

			<Scoreboard
				isOpen={showScoreboard}
				playerScores={playerScores}
				onPlayAgain={onPlayAgain}
				onLeave={() => navigate('/offline', { replace: true })}
			/>
		</>
	);
};

export default GameBoard;
