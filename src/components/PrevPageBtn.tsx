import { ChevronIcon } from '../assets/Icons';

const PrevPageBtn: React.FC<{ goPrevPage: () => void }> = ({ goPrevPage }) => {
	return (
		<button
			className='btn-prev-page'
			onClick={goPrevPage}
		>
			{ChevronIcon}
		</button>
	);
};

export default PrevPageBtn;
