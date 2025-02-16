export const getTestId = (testId: string) => (import.meta.env.MODE === 'test' ? testId : undefined);

export const getActivePlayerCard = (playerCards: HTMLElement[]) => {
	const activePlayerCards = playerCards.filter(card => card.classList.contains('player-card--active'));

	if (activePlayerCards.length === 0) throw new Error('Active player card not found');
	if (activePlayerCards.length > 1) throw new Error('More than one active player card found');

	return activePlayerCards[0];
};

export const getCapturedGridBoxes = (gridBoxes: HTMLElement[]) =>
	gridBoxes.filter(box => box.classList.contains('grid-box--captured'));

export const getSelectedGridLines = (gridLines: HTMLElement[]) =>
	gridLines.filter(line => line.classList.contains('grid-line--selected'));
