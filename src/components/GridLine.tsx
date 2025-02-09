import { cn } from '../utils/helpers';
import { getTestId } from '../utils/testUtils';

type GridLineProps = {
	alignment: 'horizontal' | 'vertical';
	handleLineClick: () => void;
	selectedBy: number | undefined;
};

const GridLine: React.FC<GridLineProps> = ({ alignment, handleLineClick, selectedBy }) => {
	return (
		<div
			className={cn(
				'grid-line',
				`grid-line--${alignment}`,
				selectedBy !== undefined && `grid-line--selected player-${selectedBy}`
			)}
			onClick={handleLineClick}
			tabIndex={0}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') handleLineClick();
			}}
			data-testid={getTestId('grid-line')}
		></div>
	);
};

export default GridLine;
