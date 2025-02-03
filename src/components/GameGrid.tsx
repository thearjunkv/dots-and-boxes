import GridLine from './GridLine';

type GameGridProps = {
	gridRowCount: number;
	gridColCount: number;
	selectedGridLineToPlayerMap: Map<string, number>;
	handleGridLineClick: (lineId: string) => void;
};

const GameGrid: React.FC<GameGridProps> = ({
	gridColCount,
	gridRowCount,
	selectedGridLineToPlayerMap,
	handleGridLineClick
}) => {
	return (
		<div className='game-grid'>
			{Array.from({ length: gridRowCount * 2 + 1 }, (_, gridRowIndex) => {
				if (gridRowIndex % 2 === 0)
					return (
						<div key={`row-${gridRowIndex}`}>
							{Array.from({ length: gridColCount * 2 + 1 }, (_, gridColIndex) => {
								if (gridColIndex % 2 === 0)
									return (
										<div
											key={`dot-${gridRowIndex}-${gridColIndex}`}
											className='game-grid__dot'
										/>
									);
								return (
									<GridLine
										alignment='horizontal'
										key={`hori-line-${gridColIndex}`}
										handleLineClick={() => handleGridLineClick(`${gridRowIndex}-${gridColIndex}`)}
										selectedBy={selectedGridLineToPlayerMap.get(`${gridRowIndex}-${gridColIndex}`)}
									/>
								);
							})}
						</div>
					);
				return (
					<div key={`row-${gridRowIndex}`}>
						{Array.from({ length: gridColCount * 2 + 1 }, (_, gridColIndex) => {
							if (gridColIndex % 2 === 0)
								return (
									<GridLine
										alignment='vertical'
										key={`vert-line-${gridColIndex}`}
										handleLineClick={() => handleGridLineClick(`${gridRowIndex}-${gridColIndex}`)}
										selectedBy={selectedGridLineToPlayerMap.get(`${gridRowIndex}-${gridColIndex}`)}
									/>
								);

							return (
								<div
									key={`box-${gridRowIndex}-${gridColIndex}`}
									className='game-grid__box'
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
