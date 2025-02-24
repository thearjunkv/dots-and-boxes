import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { Outlet } from 'react-router';
import { cn } from '../utils/helpers';

const SocketStatus = () => {
	const socket = useSocket();
	const [isConnected, setIsConnected] = useState<boolean | null>(null);

	useEffect(() => {
		if (!socket) {
			setIsConnected(null);
			return;
		}

		const handleConnect = () => setIsConnected(true);
		const handleDisconnect = () => setIsConnected(false);

		if (socket.connected) setIsConnected(true);
		else setIsConnected(false);

		socket.on('connect', handleConnect);
		socket.on('disconnect', handleDisconnect);

		return () => {
			socket.off('connect', handleConnect);
			socket.off('disconnect', handleDisconnect);
		};
	}, [socket]);

	return (
		<>
			<div className={cn('socket-status', isConnected === false && 'socket-status--disconnected')}>
				Unable to connect to server.
			</div>
			<Outlet />
		</>
	);
};

export default SocketStatus;
