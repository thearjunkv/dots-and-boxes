import { PlayerScore } from '../types/game';
import Modal from './Modal';

type ScoreboardProps = {
	isOpen: boolean;
	playerScores: PlayerScore[];
	onPlayAgain: () => void;
	onLeave: () => void;
};

const Scoreboard: React.FC<ScoreboardProps> = ({ isOpen, playerScores, onPlayAgain, onLeave }) => {
	return (
		<Modal
			isOpen={isOpen}
			hideCloseButton={true}
		>
			<div className='score-board'>
				<h1 className='score-board__title'>Scores</h1>

				<div className='score-board__score-card-container'>
					{playerScores.map(({ playerId, playerName, score }) => (
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
						onClick={onPlayAgain}
					>
						Play again
					</button>

					<button
						className='btn--secondary'
						onClick={onLeave}
					>
						Leave
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default Scoreboard;
