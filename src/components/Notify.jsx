import { toast } from 'react-toastify';

const isPrimitiveArray = (arr) =>
	Array.isArray(arr) && arr.every((item) => typeof item !== 'object');

function buildMessage(message) {
	let result = '';
	if (isPrimitiveArray(message)) {
		result =
			'<ul style="padding:0; padding-left:8px; min-width:250px;max-width:400px">';
		result += message.map((msg) => `<li>${msg}</li>`).join('');
		result += '</ul>';
	} else {
		result = message;
	}
	return result;
}

const notifySuccess = ({
	message,
	position = 'bottom-center',
	autoClose = 1500,
}) => {
	toast.success(
		<div dangerouslySetInnerHTML={{ __html: buildMessage(message) }} />,
		{
			position: position,
			autoClose: autoClose,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		},
	);
};

const notifyError = ({
	message,
	position = 'bottom-center',
	autoClose = 3000,
}) => {
	toast.error(
		<div dangerouslySetInnerHTML={{ __html: buildMessage(message) }} />,
		{
			position: position,
			autoClose: autoClose,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		},
	);
};

export { notifySuccess, notifyError };
