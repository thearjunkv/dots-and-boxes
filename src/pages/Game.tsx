import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import GameGrid from '../components/GameGrid';
import { gameConfig } from '../data/gameConfig';
import { isValidGridSize, isValidPlayerCount } from '../types/guards';
import { getBoxSidesMap } from '../utils/gameUtils';
import { cn } from '../utils/helpers';
import PlayerCard from '../components/PlayerCard';
import { ChevronIcon } from '../assets/Icons';
import Modal from '../components/Modal';
import ScoreBoard from '../components/ScoreBoard';

const GameBoard: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [gameState, setGameState] = useState<{
		selectedLinesToPlayerMap: Map<string, number>;
		capturedBoxesMap: Map<string, number>;
		playerTurn: number;
	}>({ selectedLinesToPlayerMap: new Map(), capturedBoxesMap: new Map(), playerTurn: 1 });
	const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

	const data = location.state || {};
	const playerCountData = data.playerCount;
	const gridSizeData = data.gridSize;

	const playerCount = isValidPlayerCount(playerCountData) ? playerCountData : gameConfig.playerCounts[0];
	const gridSize = isValidGridSize(gridSizeData) ? gridSizeData : gameConfig.gridSizes[0];
	const [gridRowCount, gridColCount] = gameConfig.gridSizeMap[gridSize];

	const boxSidesMap = useMemo(() => getBoxSidesMap(gridRowCount, gridColCount), [gridRowCount, gridColCount]);

	const handleLineClick = (lineId: string) => {
		const { selectedLinesToPlayerMap, capturedBoxesMap, playerTurn } = gameState;
		if (selectedLinesToPlayerMap.has(lineId)) return;

		const newSelectedLinesToPlayerMap = new Map(selectedLinesToPlayerMap);
		newSelectedLinesToPlayerMap.set(lineId, playerTurn);

		let hasCapturedNewBox: boolean = false;
		const newCapturedBoxesMap = new Map(capturedBoxesMap);

		boxSidesMap.forEach((value, key) => {
			const allSelected = value.every(side => newSelectedLinesToPlayerMap.has(side));
			if (!allSelected) return;

			if (newCapturedBoxesMap.has(key)) return;

			newCapturedBoxesMap.set(key, playerTurn);
			hasCapturedNewBox = true;
		});

		setGameState({
			selectedLinesToPlayerMap: newSelectedLinesToPlayerMap,
			capturedBoxesMap: newCapturedBoxesMap,
			playerTurn: hasCapturedNewBox ? playerTurn : playerTurn >= playerCount ? 1 : playerTurn + 1
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
		if (gameState.capturedBoxesMap.size === gridRowCount * gridColCount) setIsGameFinished(true);
	}, [gameState.capturedBoxesMap.size]);

	const getAllPlayerScores = () =>
		Array.from({ length: playerCount }, (_, index: number) => {
			const playerId = index + 1;
			return {
				playerId,
				playerName: `Player ${playerId}`,
				score: [...gameState.capturedBoxesMap].filter(([_, value]) => value === playerId).length
			};
		});

	const restartGame = () => {
		setGameState({ selectedLinesToPlayerMap: new Map(), capturedBoxesMap: new Map(), playerTurn: 1 });
		setIsGameFinished(false);
	};

	return (
		<>
			<div
				className={cn('game', `game--${gridSize}`, 'centered-layout ')}
				style={gridStyle}
			>
				<button
					className='game__btn-go-back'
					onClick={goBack}
				>
					{ChevronIcon}
				</button>
				<div className='game__game-area'>
					<div className='game__player-cards-container--top'>
						<PlayerCard
							playerId={1}
							isPlayerTurn={gameState.playerTurn === 1}
						/>
						<PlayerCard
							playerId={2}
							isPlayerTurn={gameState.playerTurn === 2}
							flipLayout={true}
						/>
					</div>
					<div className='game__game-grid-wrapper'>
						<GameGrid
							rowCount={gridRowCount}
							colCount={gridColCount}
							selectedLinesToPlayerMap={gameState.selectedLinesToPlayerMap}
							capturedBoxesMap={gameState.capturedBoxesMap}
							handleLineClick={handleLineClick}
						/>
					</div>
					<div className='game__player-cards-container--bottom'>
						{playerCount > 2 && (
							<PlayerCard
								playerId={3}
								isPlayerTurn={gameState.playerTurn === 3}
							/>
						)}
						{playerCount > 3 && (
							<PlayerCard
								playerId={4}
								isPlayerTurn={gameState.playerTurn === 4}
								flipLayout={true}
							/>
						)}
					</div>
				</div>
			</div>
			<Modal isOpen={isGameFinished}>
				<ScoreBoard
					getAllPlayerScores={getAllPlayerScores}
					restartGame={restartGame}
					isGameFinished={isGameFinished}
				/>
			</Modal>
		</>
	);
};

export default GameBoard;
