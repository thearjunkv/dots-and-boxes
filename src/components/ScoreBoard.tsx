import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type Score = {
	playerId: number;
	playerName: string;
	score: number;
};

type ScoreBoardProps = {
	getAllPlayerScores: () => Score[];
	restartGame: () => void;
	isGameFinished: boolean;
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ getAllPlayerScores, restartGame, isGameFinished }) => {
	const [scores, setScores] = useState<Score[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (isGameFinished) setScores(() => getAllPlayerScores());
	}, [isGameFinished]);

	return (
		<div className='score-board'>
			<h1 className='score-board__title'>Scores</h1>

			<div className='score-board__score-card-container'>
				{scores
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

			<div className='score-board__btn-container'>
				<button
					className='btn'
					onClick={restartGame}
				>
					Restart
				</button>
				<button
					className='btn--tertiary'
					onClick={() => navigate('/')}
				>
					Go back
				</button>
			</div>
		</div>
	);
};

export default ScoreBoard;
