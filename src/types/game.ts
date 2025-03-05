export type GridSize = '4x4' | '5x5' | '6x6';

export type PlayerCount = 2 | 3 | 4; // update guards

export type PlayerScore = {
	playerId: number;
	playerName: string;
	score: number;
};

export type GameState<T> = {
	selectedLinesToPlayerMap: Map<string, T>;
	capturedBoxesMap: Map<string, T>;
	playerTurn: T;
};

export type GameStateServer = {
	roomId: string;
	gameStarted: boolean;
	nextMove: string;
	gridSize: string;
	host: string;
	players: {
		playerId: string;
		playerName: string;
		isConnected: boolean;
	}[];
};

export type SavedGameProgress = {
	selectedLines: [string, string][];
	capturedBoxes: [string, string][];
};
