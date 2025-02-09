export const getTestId = (testId: string) => {
	if (import.meta.env.MODE === 'development' || import.meta.env.MODE === 'test') return testId;
	return undefined;
};
