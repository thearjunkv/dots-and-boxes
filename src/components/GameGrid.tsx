import { cn } from '../utils/helpers';
import { getTestId } from '../utils/testUtils';
import GridLine from './GridLine';

type GameGridProps = {
	rowCount: number;
	colCount: number;
	selectedLinesToPlayerMap: Map<string, number>;
	capturedBoxesMap: Map<string, number>;
	handleLineClick: (lineId: string) => void;
};

const GameGrid: React.FC<GameGridProps> = ({
	rowCount,
	colCount,
	selectedLinesToPlayerMap,
	capturedBoxesMap,
	handleLineClick
}) => {
	return (
		<div className='game-grid'>
			{Array.from({ length: rowCount * 2 + 1 }, (_, rowIndex) => {
				if (rowIndex % 2 === 0)
					return (
						<div key={`row-${rowIndex}`}>
							{Array.from({ length: colCount * 2 + 1 }, (_, colIndex) => {
								const row_col = `${rowIndex}-${colIndex}`;

								if (colIndex % 2 === 0)
									return (
										<div
											key={`dot-${row_col}`}
											className='game-grid__dot'
										/>
									);
								return (
									<GridLine
										alignment='horizontal'
										key={`hori-line-${colIndex}`}
										handleLineClick={() => handleLineClick(row_col)}
										selectedBy={selectedLinesToPlayerMap.get(row_col)}
									/>
								);
							})}
						</div>
					);
				return (
					<div key={`row-${rowIndex}`}>
						{Array.from({ length: colCount * 2 + 1 }, (_, colIndex) => {
							const row_col = `${rowIndex}-${colIndex}`;

							if (colIndex % 2 === 0)
								return (
									<GridLine
										alignment='vertical'
										key={`vert-line-${colIndex}`}
										handleLineClick={() => handleLineClick(row_col)}
										selectedBy={selectedLinesToPlayerMap.get(row_col)}
									/>
								);

							return (
								<div
									key={`box-${row_col}`}
									className={cn(
										'game-grid__box',
										capturedBoxesMap.has(row_col) &&
											`game-grid__box--selected player-${capturedBoxesMap.get(row_col)}`
									)}
									data-testid={getTestId('grid-box')}
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
