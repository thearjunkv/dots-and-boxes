import { useState } from 'react';
import GameGrid from '../components/GameGrid';
import { gameConfig } from '../data/gameConfig';
import { useGameContext } from '../hooks/useGameContext';

const Game: React.FC = () => {
	const { gridSize } = useGameContext();
	const [gridRowCount, gridColCount] = gameConfig.gridSizeMap[gridSize];

	const [selectedGridLines, setSelectedGridLines] = useState<Set<string>>(new Set());

	const handleGridLineClick = (lineId: string) => {
		if (selectedGridLines.has(lineId)) return;
		const temp = new Set(selectedGridLines);
		temp.add(lineId);
		setSelectedGridLines(temp);
	};

	const gridBoxSize = gameConfig.gridBoxSizeMap[gridSize];

	const gridStyle = {
		'--game-grid-box-size': `${gridBoxSize}px`
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
					selectedGridLines={selectedGridLines}
					handleGridLineClick={handleGridLineClick}
				/>
			</div>
		</div>
	);
};

export default Game;
