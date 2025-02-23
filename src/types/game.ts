export type GridSize = '5x5' | '6x6' | '7x7';

export type PlayerCount = 2 | 3 | 4; // update guards

export type PlayerScore = {
	playerId: number;
	playerName: string;
	score: number;
};

export type GameState = {
	selectedLinesToPlayerMap: Map<string, number>;
	capturedBoxesMap: Map<string, number>;
	playerTurn: number;
};

export type GameStateServer = {
	gameStarted: boolean;
	currentMove: string;
	gridSize: string;
	host: string;
	players: {
		playerId: string;
		playerName: string;
		isConnected: boolean;
	}[];
};
