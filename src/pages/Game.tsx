import { useGameContext } from '../hooks/useGameContext';

const Game: React.FC = () => {
	const { gridSize, playerCount } = useGameContext();
	return (
		<>
			game {gridSize} - {playerCount}
		</>
	);
};

export default Game;
