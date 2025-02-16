import { convertEvenNumToIndex, convertOddNumToIndex } from '../utils/gameUtils';
import GridBox from './GridBox';
import GridLine from './GridLine';

type GameGridProps = {
	rowCount: number;
	colCount: number;
	selectedLinesToPlayerMap: Map<string, number>;
	capturedBoxesMap: Map<string, number>;
	handleLineClick: (lineId: string) => void;
	playerCount: number;
};

const GameGrid: React.FC<GameGridProps> = ({
	rowCount,
	colCount,
	selectedLinesToPlayerMap,
	capturedBoxesMap,
	handleLineClick,
	playerCount
}) => {
	return (
		<div className='game-grid'>
			{Array.from({ length: rowCount * 2 + 1 }, (_, rowIndex) => {
				if (rowIndex % 2 === 0)
					return (
						<div key={`row-${rowIndex}`}>
							{Array.from({ length: colCount * 2 + 1 }, (_, colIndex) => {
								const horizontalLineIndex = `${rowIndex}-${convertOddNumToIndex(colIndex)}`;
								const key = `${rowIndex}-${colIndex}`;

								if (colIndex % 2 === 0)
									return (
										<div
											key={`dot-${key}`}
											className='game-grid__grid-dot'
										/>
									);
								return (
									<GridLine
										alignment='horizontal'
										key={`horizontal-line-${key}`}
										handleLineClick={() => handleLineClick(horizontalLineIndex)}
										selectedBy={selectedLinesToPlayerMap.get(horizontalLineIndex)}
										playerCount={playerCount}
									/>
								);
							})}
						</div>
					);
				return (
					<div key={`row-${rowIndex}`}>
						{Array.from({ length: colCount * 2 + 1 }, (_, colIndex) => {
							const key = `${rowIndex}-${colIndex}`;
							const verticalLineIndex = `${rowIndex}-${convertEvenNumToIndex(colIndex)}`;
							const boxId = `${convertOddNumToIndex(rowIndex)}-${convertOddNumToIndex(colIndex)}`;

							if (colIndex % 2 === 0)
								return (
									<GridLine
										alignment='vertical'
										key={`vertical-line-${key}`}
										handleLineClick={() => handleLineClick(verticalLineIndex)}
										selectedBy={selectedLinesToPlayerMap.get(verticalLineIndex)}
										playerCount={playerCount}
									/>
								);

							return (
								<GridBox
									key={`box-${key}`}
									boxId={boxId}
									capturedBoxesMap={capturedBoxesMap}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default GameGrid;
