import { useEffect } from 'react';
import { useSocket } from './useSocket';

export const useSocketEvent = <T>(eventName: string, callback: (data: T) => void) => {
	const socket = useSocket();

	useEffect(() => {
		if (!socket) return;
		const handleEvent = (data: T) => callback(data);

		socket.on(eventName, handleEvent);
		return () => {
			socket.off(eventName, handleEvent);
		};
	}, [socket, eventName, callback]);
};
