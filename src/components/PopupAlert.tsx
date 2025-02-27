import Modal from './Modal';

type PopupAlertProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	body: string;
	hideCloseButton?: boolean;
	confirmBtnText?: string;
	onConfirm?: () => void;
};

const PopupAlert: React.FC<PopupAlertProps> = ({
	isOpen,
	onClose,
	title,
	body,
	hideCloseButton,
	confirmBtnText,
	onConfirm
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			hideCloseButton={hideCloseButton}
		>
			<div className='popup-alert'>
				<h2 className='popup-alert__title'>{title}</h2>
				<p className='popup-alert__body'>{body}</p>
				<button
					className='btn'
					onClick={() => (onConfirm ? onConfirm() : onClose())}
				>
					{confirmBtnText || 'OK'}
				</button>
			</div>
		</Modal>
	);
};

export default PopupAlert;
