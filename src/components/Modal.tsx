import { cn } from '../utils/helpers';

type ModalProps = {
	isOpen: boolean;
	children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
	return (
		<div className={cn('modal-bg', isOpen && `modal-bg--open`)}>
			<div className='modal'>{children}</div>
		</div>
	);
};

export default Modal;
