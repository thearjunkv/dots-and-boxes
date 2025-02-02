import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Game from './pages/Game';
import './styles/main.scss';

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
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
