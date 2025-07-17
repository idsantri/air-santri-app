import { useState, useEffect, useRef } from 'react';

function useForm(initialData = {}) {
	const [formData, setFormData] = useState({});
	const [hasInitialized, setHasInitialized] = useState(false);
	const initialRef = useRef({}); // <- menyimpan nilai awal persistently

	useEffect(() => {
		if (
			!hasInitialized &&
			initialData &&
			Object.keys(initialData).length > 0
		) {
			const copied = { ...initialData };
			setFormData(copied);
			initialRef.current = copied; // <- simpan nilai awal
			setHasInitialized(true);
		}
	}, [initialData, hasInitialized]);

	const updateField = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const resetForm = () => {
		setFormData({ ...initialRef.current }); // <- reset ke nilai awal
	};

	return {
		formData,
		setFormData,
		updateField,
		resetForm,
	};
}

export default useForm;
