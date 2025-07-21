import { useState, useEffect, useRef } from 'react';

function useForm(initialData = {}) {
	const [formData, setFormData] = useState({});
	const [hasInitialized, setHasInitialized] = useState(false);
	const initialRef = useRef({});

	useEffect(() => {
		if (
			!hasInitialized &&
			initialData &&
			Object.keys(initialData).length > 0
		) {
			const copied = { ...initialData };
			setFormData(copied);
			initialRef.current = copied;
			setHasInitialized(true);
		}
	}, [initialData, hasInitialized]);

	const updateField = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const resetForm = () => {
		setFormData({ ...initialRef.current });
	};

	const pickFields = (keys = []) => {
		if (!Array.isArray(keys)) return {};
		return keys.reduce((result, key) => {
			if (key in formData) result[key] = formData[key];
			return result;
		}, {});
	};

	const getFormInputs = (e) => {
		const form = e.target;
		const data = {};

		// Ambil semua input, textarea, select yang punya name
		const inputs = form.querySelectorAll(
			'input[name], textarea[name], select[name]',
		);

		inputs.forEach((input) => {
			if (input.name && input.value.trim()) {
				data[input.name] = input.value.trim();
			}
		});

		// Tambahkan id jika ada (untuk update)
		// if (initialData.id) {
		// 	data.id = initialData.id;
		// }

		return data;
	};

	return {
		formData,
		setFormData,
		updateField,
		resetForm,
		pickFields,
		getFormInputs,
	};
}

export default useForm;
