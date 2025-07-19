import { useState } from 'react';
import FormActions from '../../components/FormActions';
import LoadingFixed from '../../components/LoadingFixed';
import useForm from '../../hooks/useForm';
import salePayments from '../../models/salePayments';
import { useNavigate } from 'react-router';

const SalePaymentForm = ({ sale_id, inputData = {} }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { formData, updateField, resetForm } = useForm(inputData);
	const navigate = useNavigate();
	const options = [
		{
			value: 'Tunai',
			label: 'Tunai',
		},
		{
			value: 'Transfer',
			label: 'Transfer',
		},
		{
			value: 'Lainnya',
			label: 'Lainnya',
		},
	];

	const onSubmit = (e) => {
		e.preventDefault();
		const defaultPayment = options[0].value;
		formData.payment_method = formData?.payment_method ?? defaultPayment;
		formData.sale_id = sale_id;
		// console.log('🚀 ~ onSubmit ~ formData:', formData);
		// return;
		setIsLoading(true);
		salePayments
			.create(formData)
			.then(({ _ }) => {
				// console.log(_product);
				// resetForm();
				navigate(`/sales/${sale_id}`);
			})
			.catch((error) => {
				console.error('Failed to create product:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
			{isLoading && <LoadingFixed>Memproses data…</LoadingFixed>}
			<label className="floating-label">
				<span>Nominal</span>
				<input
					type="number"
					className="input w-full"
					value={formData?.amount ?? ''}
					onChange={(e) => updateField('amount', e.target.value)}
				/>
			</label>

			<label className="floating-label">
				<span>Tanggal</span>
				<input
					type="date"
					className="input w-full"
					value={
						formData?.payment_date
							? formData.payment_date.split('T')[0]
							: ''
					}
					onChange={(e) =>
						updateField(
							'payment_date',
							new Date(e.target.value).toISOString(),
						)
					}
				/>
				<div className="text-xs text-info-content/75 ml-2">
					Kosongkan untuk waktu saat ini
				</div>
			</label>

			<label className="floating-label">
				<span>Metode Pembayaran</span>
				<select
					className="input w-full"
					value={formData?.payment_method}
					onChange={(e) =>
						updateField('payment_method', e.target.value)
					}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</label>

			<label className="floating-label">
				<span>Catatan</span>
				<textarea
					className="textarea w-full"
					value={formData?.note ?? ''}
					onChange={(e) => updateField('note', e.target.value)}
				/>
			</label>

			<FormActions onReset={resetForm} hideDelete />
		</form>
	);
};

export default SalePaymentForm;
