import { useState } from 'react';

const useNotify = () => {
	const [objNotify, setObjNotify] = useState({
		message: '',
		title: 'Error',
		code: '',
		isError: true,
		show: false,
		onClose: () => setObjNotify((prevNotify) => ({ ...prevNotify, show: false })),
	});

	return { objNotify, setObjNotify };
};

export default useNotify;
