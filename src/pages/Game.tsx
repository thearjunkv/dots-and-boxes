import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import GameGrid from '../components/GameGrid';
import { gameConfig } from '../data/gameConfig';
import { isValidGridSize, isValidPlayerCount } from '../types/guards';
import { initializeGridBoxes } from '../utils/gameUtils';

const Game: React.FC = () => {
	const location = useLocation();

	const [gameState, setGameState] = useState<{
		selectedGridLineToPlayerMap: Map<string, number>;
		capturedBoxesMap: Map<string, number | null>;
		playerTurn: number;
	}>({ selectedGridLineToPlayerMap: new Map(), capturedBoxesMap: new Map(), playerTurn: 1 });

	const data = location.state || {};
	const playerCountData = data.playerCount;
	const gridSizeData = data.gridSize;

	const playerCount = isValidPlayerCount(playerCountData) ? playerCountData : gameConfig.playerCounts[0];
	const gridSize = isValidGridSize(gridSizeData) ? gridSizeData : gameConfig.gridSizes[0];
	const [gridRowCount, gridColCount] = gameConfig.gridSizeMap[gridSize];

	const gridBoxesInfo = useMemo(() => initializeGridBoxes(gridRowCount, gridColCount), [gridRowCount, gridColCount]);
	const { boxSidesMap } = gridBoxesInfo;

	useEffect(() => {
		setGameState(p => ({ ...p, capturedBoxesMap: new Map(gridBoxesInfo.capturedBoxesMap) }));
	}, [gridRowCount, gridColCount, gridBoxesInfo.capturedBoxesMap]);

	const handleGridLineClick = (lineId: string) => {
		const { selectedGridLineToPlayerMap, capturedBoxesMap, playerTurn } = gameState;
		if (selectedGridLineToPlayerMap.has(lineId)) return;

		const newSelectedGridLineToPlayerMap = new Map(selectedGridLineToPlayerMap);
		newSelectedGridLineToPlayerMap.set(lineId, playerTurn);

		let hasCapturedNewBox: boolean = false;
		const newCapturedBoxesMap = new Map(capturedBoxesMap);

		boxSidesMap.forEach((value, key) => {
			const allSelected = value.every(side => newSelectedGridLineToPlayerMap.has(side));
			if (!allSelected) return;

			const capturedBoxData = newCapturedBoxesMap.get(key);
			if (typeof capturedBoxData === 'number') return;

			newCapturedBoxesMap.set(key, playerTurn);
			hasCapturedNewBox = true;
		});

		setGameState(p => ({
			...p,
			selectedGridLineToPlayerMap: newSelectedGridLineToPlayerMap,
			capturedBoxesMap: newCapturedBoxesMap,
			playerTurn: hasCapturedNewBox ? playerTurn : playerTurn >= playerCount ? 1 : playerTurn + 1
		}));
	};

	const gridBoxSize = gameConfig.gridBoxSizeMap[gridSize];

	const gridStyle = {
		'--game-grid-box-size': `${gridBoxSize}px`,
		'--player-1-color': gameConfig.playerColors.get(1),
		'--player-2-color': gameConfig.playerColors.get(2),
		'--player-3-color': gameConfig.playerColors.get(3),
		'--player-4-color': gameConfig.playerColors.get(4)
	} as React.CSSProperties;

	return (
		<div
			className='game'
			style={gridStyle}
		>
			<div className='game__board'>
				<GameGrid
					gridRowCount={gridRowCount}
					gridColCount={gridColCount}
					selectedGridLineToPlayerMap={gameState.selectedGridLineToPlayerMap}
					handleGridLineClick={handleGridLineClick}
				/>
			</div>
		</div>
	);
};

export default Game;
