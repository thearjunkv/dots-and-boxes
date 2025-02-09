import { render, screen } from '@testing-library/react';
import GridLine from '../../src/components/GridLine';

describe('GridLine component', () => {
	it('should be in the document', () => {
		render(
			<GridLine
				alignment='horizontal'
				handleLineClick={() => {}}
				selectedBy={undefined}
			/>
		);

		expect(screen.getByTestId('grid-line')).toBeInTheDocument();
	});
});
