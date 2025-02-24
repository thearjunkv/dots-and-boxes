import Modal from './Modal';

type PopupAlertProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	body: string;
};

const PopupAlert: React.FC<PopupAlertProps> = ({ isOpen, onClose, title, body }) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className='popup-alert'>
				<h2>{title}</h2>
				<p>{body}</p>
				<button
					className='btn'
					onClick={onClose}
				>
					OK
				</button>
			</div>
		</Modal>
	);
};

export default PopupAlert;
