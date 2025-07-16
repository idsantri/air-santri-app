import useConfirmDialog from '../hooks/use-confirm-dialog';

const FormActions = ({ onDelete, isNew }) => {
	const dialog = useConfirmDialog();

	const onCancel = async () => {
		const isConfirmed = await dialog({
			message: 'Batalkan formulir ini?',
		});
		if (!isConfirmed) return;

		window.history.back();
	};

	return (
		<div className="flex items-center justify-between">
			{!isNew ? (
				<button
					className="btn btn-warning text-warning-content"
					type="button"
					onClick={onDelete}
				>
					Hapus
				</button>
			) : (
				<div></div>
			)}
			<div className="flex items-center gap-2">
				<button
					className="btn btn-secondary text-secondary-content"
					type="button"
					onClick={onCancel}
				>
					Gagal
				</button>
				<button
					type="submit"
					className="btn btn-neutral text-neutral-content"
				>
					Simpan
				</button>
			</div>
		</div>
	);
};
export default FormActions;
