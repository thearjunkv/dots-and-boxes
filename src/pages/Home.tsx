import { Link } from 'react-router';
import { cn } from '../utils/helpers';

const Home: React.FC = () => {
	return (
		<div className={cn('home', 'centered-layout')}>
			<h1 className='title'>Dots and Boxes</h1>
			<div className='home__nav-links-container'>
				<Link to='offline'>Play Offline</Link>
				<Link to='online'>Play Online</Link>
			</div>
		</div>
	);
};

export default Home;
