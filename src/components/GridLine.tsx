import { testIds } from '../constants/testIds';
import { cn } from '../utils/helpers';
import { getTestId } from '../utils/testUtils';

type GridLineProps = {
	alignment: 'horizontal' | 'vertical';
	handleLineClick: () => void;
	isSelected: boolean;
	playerColor?: string;
};

const GridLine: React.FC<GridLineProps> = ({ alignment, handleLineClick, isSelected, playerColor }) => {
	return (
		<div
			style={{ '--player-color': playerColor ?? 'hsl(0, 0%, 31%)' } as React.CSSProperties}
			className={cn('grid-line', `grid-line--${alignment}`, isSelected && `grid-line--selected`)}
			onClick={handleLineClick}
			tabIndex={0}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') handleLineClick();
			}}
			data-testid={getTestId(testIds.GRID_LINE)}
		></div>
	);
};

export default GridLine;
