import { convertEvenNumToIndex, convertOddNumToIndex } from '../utils/gameUtils';
import GridBox from './GridBox';
import GridLine from './GridLine';

type GameGridProps<T> = {
	rowCount: number;
	colCount: number;
	selectedLinesToPlayerMap: Map<string, T>;
	capturedBoxesMap: Map<string, T>;
	handleLineClick: (lineId: string) => void;
	playerColorsMap: Map<T, string>;
};

const GameGrid = <T,>({
	rowCount,
	colCount,
	selectedLinesToPlayerMap,
	capturedBoxesMap,
	handleLineClick,
	playerColorsMap
}: GameGridProps<T>) => {
	return (
		<div className='game-grid'>
			{Array.from({ length: rowCount * 2 + 1 }, (_, rowIndex) => {
				if (rowIndex % 2 === 0)
					return (
						<div key={`row-${rowIndex}`}>
							{Array.from({ length: colCount * 2 + 1 }, (_, colIndex) => {
								const key = `${rowIndex}-${colIndex}`;

								const horizontalLineIndex = `${rowIndex}-${convertOddNumToIndex(colIndex)}`;
								const selectedBy = selectedLinesToPlayerMap.get(horizontalLineIndex);

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
										isSelected={!!selectedBy}
										playerColor={selectedBy && playerColorsMap.get(selectedBy)}
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
							const selectedBy = selectedLinesToPlayerMap.get(verticalLineIndex);

							const boxId = `${convertOddNumToIndex(rowIndex)}-${convertOddNumToIndex(colIndex)}`;
							const capturedBy = capturedBoxesMap.get(boxId);

							if (colIndex % 2 === 0)
								return (
									<GridLine
										alignment='vertical'
										key={`vertical-line-${key}`}
										handleLineClick={() => handleLineClick(verticalLineIndex)}
										isSelected={!!selectedBy}
										playerColor={selectedBy && playerColorsMap.get(selectedBy)}
									/>
								);

							return (
								<GridBox
									key={`box-${key}`}
									isCaptured={!!capturedBy}
									playerColor={capturedBy && playerColorsMap.get(capturedBy)}
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
