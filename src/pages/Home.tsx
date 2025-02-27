import { Link } from 'react-router';

const Home: React.FC = () => {
	return (
		<div className='home'>
			<h1 className='title'>Dots and Boxes</h1>
			<div className='home__links-container'>
				<Link to='offline'>Play Offline</Link>
				<Link to='online'>Play Online</Link>
			</div>
		</div>
	);
};

export default Home;
