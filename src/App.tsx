import { Route, Routes } from 'react-router';
import SetupGame from './pages/SetupGame';
import GameBoard from './pages/GameBoard';
import './styles/main.scss';

function App() {
	return (
		<Routes>
			<Route
				index
				element={<SetupGame />}
			/>
			<Route
				path='play'
				element={<GameBoard />}
			/>
		</Routes>
	);
}

export default App;
