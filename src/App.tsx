import { Route, Routes } from 'react-router';
import AppLayout from './components/AppLayout';
import GameSetup from './pages/GameSetup';
import GameBoard from './pages/GameBoard';
import './styles/main.scss';

function App() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route
					index
					element={<GameSetup />}
				/>
				<Route
					path='game-board'
					element={<GameBoard />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
