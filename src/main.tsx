import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './index.css';
import { SocketProvider } from './context/SocketProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<SocketProvider>
				<App />
			</SocketProvider>
		</BrowserRouter>
	</StrictMode>
);
