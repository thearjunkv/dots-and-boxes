import { Outlet } from 'react-router';

const Layout: React.FC = () => {
	return (
		<div className='layout'>
			<Outlet />
		</div>
	);
};

export default Layout;
