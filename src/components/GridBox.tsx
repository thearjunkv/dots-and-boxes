import { testIds } from '../constants/testIds';
import { cn } from '../utils/helpers';
import { getTestId } from '../utils/testUtils';

type GridBoxProps = { isCaptured: boolean; playerColor?: string };

const GridBox: React.FC<GridBoxProps> = ({ isCaptured, playerColor }) => {
	return (
		<div
			style={{ '--player-color': playerColor ?? 'hsl(0, 0%, 10%)' } as React.CSSProperties}
			className={cn('grid-box', isCaptured && 'grid-box--captured')}
			data-testid={getTestId(testIds.GRID_BOX)}
		/>
	);
};

export default GridBox;
