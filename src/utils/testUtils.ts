export const getTestId = (testId: string) => (import.meta.env.MODE === 'test' ? testId : undefined);

export const getActivePlayerCard = (playerCards: HTMLElement[]) => {
	const activePlayerCards = playerCards.filter(card => card.classList.contains('player-card--active'));

	expect(activePlayerCards.length).toBe(1);
	return activePlayerCards[0];
};

export const getCapturedGridBoxes = (gridBoxes: HTMLElement[]) =>
	gridBoxes.filter(box => box.classList.contains('grid-box--captured'));

export const getSelectedGridLines = (gridLines: HTMLElement[]) =>
	gridLines.filter(line => line.classList.contains('grid-line--selected'));

export const checkPlayerColor = (element: HTMLElement, color: string) => {
	const computedStyle = getComputedStyle(element);
	expect(computedStyle.getPropertyValue('--player-color')).toBe(color);
};
