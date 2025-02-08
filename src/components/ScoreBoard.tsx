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

			<div className='score-board__score-container'>
				{scores.map(({ playerId, playerName, score }) => (
					<div
						className='score-board__score-card'
						key={playerId}
					>
						<div className='score-board__player-icon-wrapper'>
							<img
								src={`/assets/player-${playerId}.svg`}
								alt='Player Icon'
							/>
						</div>
						<div className='score-board__player-name'>{playerName}</div>
						<div className='score-board__player-score'>{score}</div>
					</div>
				))}
			</div>

			<div className='score-board__btn-container'>
				<button
					className='score-board__btn score-board__btn--restart'
					onClick={restartGame}
				>
					Restart
				</button>
				<button
					className='score-board__btn score-board__btn--go-back'
					onClick={() => navigate('/')}
				>
					Go back
				</button>
			</div>
		</div>
	);
};

export default ScoreBoard;
