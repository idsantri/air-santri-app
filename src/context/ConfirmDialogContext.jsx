import { createContext, useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';

// eslint-disable-next-line react-refresh/only-export-components
export const ConfirmDialogContext = createContext();

export const ConfirmDialogProvider = ({ children }) => {
	const [dialogState, setDialogState] = useState({
		isOpen: false,
		title: '',
		message: '',
		resolve: null,
	});

	const confirmDialog = ({ title, message }) => {
		return new Promise((resolve) => {
			setDialogState({
				isOpen: true,
				title,
				message,
				resolve,
			});
		});
	};

	const handleConfirm = (result) => {
		dialogState.resolve?.(result);
		setDialogState((prevState) => ({
			...prevState,
			isOpen: false,
			resolve: null,
		}));
	};

	return (
		<ConfirmDialogContext.Provider value={confirmDialog}>
			{children}
			{dialogState.isOpen && (
				<ConfirmDialog
					title={dialogState.title}
					message={dialogState.message}
					onConfirm={() => handleConfirm(true)}
					onCancel={() => handleConfirm(false)}
				/>
			)}
		</ConfirmDialogContext.Provider>
	);
};
