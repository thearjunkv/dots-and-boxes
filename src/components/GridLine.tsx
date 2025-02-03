import { cn } from '../utils/helpers';

const GridLine: React.FC<{
	alignment: 'horizontal' | 'vertical';
	handleLineClick: () => void;
	selectedBy: number | undefined;
}> = ({ alignment, handleLineClick, selectedBy }) => {
	return (
		<div
			className={cn(
				'grid-line',
				`grid-line--${alignment}`,
				selectedBy !== undefined && `selected player-${selectedBy}`
			)}
			onClick={handleLineClick}
			tabIndex={0}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') handleLineClick();
			}}
		></div>
	);
};

export default GridLine;
