import { render, screen } from '@testing-library/react';
import GridLine from '../../src/components/GridLine';
import userEvent from '@testing-library/user-event';

describe('GridLine component', () => {
	let selectedBy: number | undefined;
	const handleLineClick = vi.fn((value: number) => (selectedBy = value));

	it('should be in the document with proper alignment', () => {
		const { rerender } = render(
			<GridLine
				alignment='horizontal'
				handleLineClick={() => handleLineClick(1)}
				selectedBy={selectedBy}
			/>
		);

		const gridLine = screen.getByTestId('grid-line');
		expect(gridLine).toHaveClass('grid-line--horizontal');

		rerender(
			<GridLine
				alignment='vertical'
				handleLineClick={() => handleLineClick(1)}
				selectedBy={selectedBy}
			/>
		);
		expect(gridLine).toHaveClass('grid-line--vertical');
	});

	it('should have class name of player-2 and grid-line--selected when clicked', async () => {
		const { rerender } = render(
			<GridLine
				alignment='vertical'
				handleLineClick={() => handleLineClick(2)}
				selectedBy={selectedBy}
			/>
		);
		const gridLine = screen.getByTestId('grid-line');

		expect(gridLine).not.toHaveClass('grid-line--selected');
		expect(gridLine).not.toHaveClass('player-2');

		const user = userEvent.setup();
		await user.click(gridLine);

		expect(handleLineClick).toHaveBeenCalledOnce();

		rerender(
			<GridLine
				alignment='vertical'
				handleLineClick={() => handleLineClick(2)}
				selectedBy={selectedBy}
			/>
		);
		expect(gridLine).toHaveClass('grid-line--selected');
		expect(gridLine).toHaveClass('player-2');
	});
});
