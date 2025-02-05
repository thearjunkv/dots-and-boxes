import { Route, Routes } from 'react-router';
import GameSetup from './pages/GameSetup';
import Game from './pages/Game';
import './styles/main.scss';

function App() {
	return (
		<Routes>
			<Route
				index
				element={<GameSetup />}
			/>
			<Route
				path='game'
				element={<Game />}
			/>
		</Routes>
	);
}

export default App;
