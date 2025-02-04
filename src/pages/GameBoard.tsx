import { useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import GameGrid from '../components/GameGrid';
import { gameConfig } from '../data/gameConfig';
import { isValidGridSize, isValidPlayerCount } from '../types/guards';
import { getBoxSidesMap } from '../utils/gameUtils';
import { cn } from '../utils/helpers';

const GameBoard: React.FC = () => {
	const location = useLocation();

	const [gameState, setGameState] = useState<{
		selectedLinesToPlayerMap: Map<string, number>;
		capturedBoxesMap: Map<string, number>;
		playerTurn: number;
	}>({ selectedLinesToPlayerMap: new Map(), capturedBoxesMap: new Map(), playerTurn: 1 });

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

	const gridStyle = Object.fromEntries(
		Array.from({ length: gameConfig.playerColorsMap.size }, (_, i) => [
			`--player-${i + 1}-color`,
			gameConfig.playerColorsMap.get(i + 1)
		])
	) as React.CSSProperties;

	return (
		<div
			className={cn('game-board', `game-board--${gridSize}`)}
			style={gridStyle}
		>
			<GameGrid
				rowCount={gridRowCount}
				colCount={gridColCount}
				selectedLinesToPlayerMap={gameState.selectedLinesToPlayerMap}
				capturedBoxesMap={gameState.capturedBoxesMap}
				handleLineClick={handleLineClick}
			/>
		</div>
	);
};

export default GameBoard;
