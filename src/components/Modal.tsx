import { AddIcon } from '../assets/Icons';
import { cn } from '../utils/helpers';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	return (
		<div className={cn('modal-bg', isOpen && `modal-bg--open`)}>
			<div className='modal'>
				<button
					className='modal__btn-close'
					onClick={onClose}
				>
					{AddIcon}
				</button>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
