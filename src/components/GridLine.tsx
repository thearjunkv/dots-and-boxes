import { cn } from '../utils/helpers';

const GridLine: React.FC<{
	alignment: 'horizontal' | 'vertical';
	handleLineClick: () => void;
	isSelected: boolean;
}> = ({ alignment, handleLineClick, isSelected }) => {
	return (
		<div
			className={cn('grid-line', `grid-line--${alignment}`, isSelected && 'selected')}
			onClick={handleLineClick}
			tabIndex={0}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') handleLineClick();
			}}
		></div>
	);
};

export default GridLine;
