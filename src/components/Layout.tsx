import { Outlet } from 'react-router';

const Layout: React.FC = () => {
	return (
		<div className='main-layout'>
			<Outlet />
		</div>
	);
};

export default Layout;
