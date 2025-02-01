import { GridSize, PlayerCount } from '../../types/game';

export type TGameContext = {
	playerCount: PlayerCount;
	setPlayerCount: React.Dispatch<React.SetStateAction<PlayerCount>>;
	gridSize: GridSize;
	setGridSize: React.Dispatch<React.SetStateAction<GridSize>>;
};
