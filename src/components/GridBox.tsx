import { testIds } from '../constants/testIds';
import { cn } from '../utils/helpers';
import { getTestId } from '../utils/testUtils';

type GridBoxProps = { boxId: string; capturedBoxesMap: Map<string, number> };

const GridBox: React.FC<GridBoxProps> = ({ boxId, capturedBoxesMap }) => {
	return (
		<div
			className={cn(
				'grid-box',
				capturedBoxesMap.has(boxId) && `grid-box--captured player-${capturedBoxesMap.get(boxId)}`
			)}
			data-testid={getTestId(testIds.GRID_BOX)}
		/>
	);
};

export default GridBox;
