import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketContext } from './SocketContext';
import { useLocation } from 'react-router';

export function SocketProvider({ children }: { children: React.ReactNode }) {
	const [socket, setSocket] = useState<Socket | null>(null);
	const location = useLocation();
	const isOnlineRoute = location.pathname.startsWith('/online');

	useEffect(() => {
		if (isOnlineRoute) {
			const socketClient = io(import.meta.env.VITE_SOCKET_URL);
			setSocket(socketClient);

			return () => {
				socketClient.disconnect();
				setSocket(null);
			};
		} else
			setSocket(prevSocket => {
				if (prevSocket) prevSocket.disconnect();
				return null;
			});
	}, [isOnlineRoute]);
	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
