import { NavLink, Outlet, useNavigate } from 'react-router';
import { cn } from '../../utils/helpers';
import PrevPageBtn from '../../components/PrevPageBtn';

const SetupRoom: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className={cn('setup-room', 'centered-layout')}>
			<PrevPageBtn goPrevPage={() => navigate('/', { replace: true })} />
			<h1 className='title'>Play Online</h1>
			<div className='setup-room__nav-links-container'>
				<NavLink
					to='/online'
					end
					className={({ isActive }) => (isActive ? 'nav-link--active' : '')}
				>
					Create Room
				</NavLink>
				<NavLink
					to='/online/join'
					className={({ isActive }) => (isActive ? 'nav-link--active' : '')}
				>
					Join Room
				</NavLink>
			</div>
			<Outlet />
		</div>
	);
};

export default SetupRoom;
