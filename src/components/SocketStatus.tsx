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

		socket.on('connect', handleConnect);
		socket.on('connect_error', handleDisconnect);

		socket.on('reconnect_error', handleDisconnect);
		socket.on('reconnect_failed', handleDisconnect);

		socket.on('disconnect', handleDisconnect);

		return () => {
			socket.off('connect', handleConnect);
			socket.off('connect_error', handleDisconnect);

			socket.off('reconnect_error', handleDisconnect);
			socket.off('reconnect_failed', handleDisconnect);

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
