import { GridSize } from '../../types/game';

export type TGameContext = {
	playerCount: 2 | 3 | 4;
	setPlayerCount: React.Dispatch<React.SetStateAction<2 | 3 | 4>>;
	gridSize: GridSize;
	setGridSize: React.Dispatch<React.SetStateAction<GridSize>>;
};
