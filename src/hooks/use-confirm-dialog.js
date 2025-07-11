import { useContext } from 'react';
import { ConfirmDialogContext } from '../context/ConfirmDialogContext';

const useConfirmDialog = () => {
	const confirmDialog = useContext(ConfirmDialogContext);
	return confirmDialog;
};

export default useConfirmDialog;
