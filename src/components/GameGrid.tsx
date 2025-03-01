import { evenToPos, oddToPos } from '../utils/gameUtils';
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
			{Array.from({ length: rowCount * 2 + 1 }, (_, rowIndexTemp) => {
				const rowIndex = rowIndexTemp + 1;

				if (rowIndex % 2 === 1)
					return (
						<div key={`row-${rowIndex}`}>
							{Array.from({ length: colCount * 2 + 1 }, (_, colIndexTemp) => {
								const colIndex = colIndexTemp + 1;
								const key = `${rowIndex}-${colIndex}`;

								if (colIndex % 2 === 1)
									return (
										<div
											key={key}
											className='game-grid__grid-dot'
										/>
									);

								const horizontalLineId = `${rowIndex}-${evenToPos(colIndex)}`;
								const selectedBy = selectedLinesToPlayerMap.get(horizontalLineId);

								return (
									<GridLine
										alignment='horizontal'
										key={key}
										handleLineClick={() => handleLineClick(horizontalLineId)}
										isSelected={!!selectedBy}
										playerColor={selectedBy && playerColorsMap.get(selectedBy)}
									/>
								);
							})}
						</div>
					);
				return (
					<div key={`row-${rowIndex}`}>
						{Array.from({ length: colCount * 2 + 1 }, (_, colIndexTemp) => {
							const colIndex = colIndexTemp + 1;
							const key = `${rowIndex}-${colIndex}`;

							if (colIndex % 2 === 1) {
								const verticalLineId = `${rowIndex}-${oddToPos(colIndex)}`;
								const selectedBy = selectedLinesToPlayerMap.get(verticalLineId);

								return (
									<GridLine
										alignment='vertical'
										key={key}
										handleLineClick={() => handleLineClick(verticalLineId)}
										isSelected={!!selectedBy}
										playerColor={selectedBy && playerColorsMap.get(selectedBy)}
									/>
								);
							}
							const boxId = `${evenToPos(rowIndex)}-${evenToPos(colIndex)}`;
							const capturedBy = capturedBoxesMap.get(boxId);

							return (
								<GridBox
									key={key}
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
