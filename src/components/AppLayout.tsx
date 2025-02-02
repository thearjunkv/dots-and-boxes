import { Outlet } from 'react-router';

const AppLayout: React.FC = () => {
	return (
		<div className='app-layout'>
			<Outlet />
		</div>
	);
};

export default AppLayout;
