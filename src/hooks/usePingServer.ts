import { useEffect } from 'react';

const PING_INTERVAL = 10 * 60 * 1000;

export const usePingServer = () => {
	useEffect(() => {
		const pingServer = async () => {
			const url = import.meta.env.VITE_SOCKET_URL;
			if (!url) {
				console.error('Socket url is not defined');
				return;
			}

			try {
				const res = await fetch(url);
				if (!res.ok) throw 'Server error';
				console.log('Ping successful');
			} catch (e) {
				console.error('Ping failed: ', e);
			}
		};

		pingServer();
		const interval = setInterval(pingServer, PING_INTERVAL);

		return () => clearInterval(interval);
	}, []);
};
