import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import SetupGame from './pages/offline/SetupGame';
import GameBoard from './pages/offline/GameBoard';

import SetupRoom from './pages/online/SetupRoom';
import CreateRoom from './pages/online/CreateRoom';
import JoinRoom from './pages/online/JoinRoom';

import './styles/main.scss';
import SocketStatus from './components/SocketStatus';
import PreGame from './pages/online/PreGame';

function App() {
	return (
		<Routes>
			<Route
				index
				element={<Home />}
			/>
			<Route path='offline'>
				<Route
					index
					element={<SetupGame />}
				/>
				<Route
					path='play'
					element={<GameBoard />}
				/>
			</Route>
			<Route
				path='online'
				element={<SocketStatus />}
			>
				<Route element={<SetupRoom />}>
					<Route
						index
						element={<CreateRoom />}
					/>
					<Route
						path='join'
						element={<JoinRoom />}
					/>
				</Route>
				<Route
					path='pre-game'
					element={<PreGame />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
