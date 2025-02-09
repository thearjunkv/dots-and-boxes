type Score = {
	playerId: number;
	playerName: string;
	score: number;
};

type ScoreBoardProps = {
	playerScores: Score[];
	restartGame: () => void;
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ playerScores, restartGame }) => {
	return (
		<div className='score-board'>
			<h1 className='score-board__title'>Scores</h1>

			<div className='score-board__score-card-container'>
				{playerScores
					.sort((a, b) => b.score - a.score)
					.map(({ playerId, playerName, score }) => (
						<div
							className='score-board__score-card'
							key={playerId}
						>
							<div className='score-board__player-icon-wrapper'>
								<img
									src={`/assets/player-${playerId}.svg`}
									alt='Player Icon'
									className='score-board__player-icon'
								/>
							</div>
							<div className='score-board__player-name'>{playerName}</div>
							<div className='score-board__player-score'>{score}</div>
						</div>
					))}
			</div>

			<button
				className='btn'
				onClick={restartGame}
			>
				Restart
			</button>
		</div>
	);
};

export default ScoreBoard;
