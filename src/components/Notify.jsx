import { toast } from 'react-toastify';

const notifySuccess = ({ message, position = 'bottom-center', autoClose = 3000 }) => {
	toast.success(<div dangerouslySetInnerHTML={{ __html: message }} />, {
		position: position,
		autoClose: autoClose,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};
const notifyError = ({ message, position = 'bottom-center', autoClose = 3000 }) => {
	toast.error(<div dangerouslySetInnerHTML={{ __html: message }} />, {
		position: position,
		autoClose: autoClose,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export { notifySuccess, notifyError };
