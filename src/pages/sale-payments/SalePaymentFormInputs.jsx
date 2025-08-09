import SelectClearable from '../../components/SelectClearable';

const SalePaymentFormInputs = ({ formData, updateField }) => {
	return (
		<div className="flex flex-col gap-4">
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

			<SelectClearable
				label="Metode Pembayaran *"
				options={['Tunai', 'Transfer', 'Lainnya']}
				value={formData?.payment_method || ''}
				onChange={(val) => updateField('payment_method', val)}
				placeholder="Pilih metode pembayaran"
			/>

			<label className="floating-label">
				<span>Catatan</span>
				<textarea
					className="textarea w-full"
					value={formData?.note ?? ''}
					onChange={(e) => updateField('note', e.target.value)}
				/>
			</label>
		</div>
	);
};

export default SalePaymentFormInputs;
