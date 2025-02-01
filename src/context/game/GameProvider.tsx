import { ReactNode, useState } from 'react';
import { GameContext } from './GameContext';
import { TGameContext } from './types';

const GameProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [playerCount, setPlayerCount] = useState<TGameContext['playerCount']>(2);
	const [gridSize, setGridSize] = useState<TGameContext['gridSize']>('3x3');

	return (
		<GameContext.Provider value={{ playerCount, setPlayerCount, gridSize, setGridSize }}>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
