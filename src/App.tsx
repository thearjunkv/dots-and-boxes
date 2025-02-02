import { Route, Routes } from 'react-router';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Game from './pages/Game';
import './styles/main.scss';

function App() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path='game'
					element={<Game />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
