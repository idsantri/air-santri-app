import useConfirmDialog from '../hooks/use-confirm-dialog';

const FormActions = ({
	onDelete,
	onReset,
	hideDelete,
	isLoading,
	hideCancel,
}) => {
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
			<div className="flex items-center gap-2">
				<button
					disabled={isLoading}
					className="btn btn-warning text-warning-content"
					type="button"
					onClick={onReset}
				>
					Reset
				</button>
				{!hideDelete && (
					<button
						disabled={isLoading}
						className="btn btn-error text-error-content"
						type="button"
						onClick={onDelete}
					>
						Hapus
					</button>
				)}
			</div>
			<div className="flex items-center gap-2">
				{!hideCancel && (
					<button
						disabled={isLoading}
						className="btn btn-secondary text-secondary-content"
						type="button"
						onClick={onCancel}
					>
						Gagal
					</button>
				)}
				<button
					disabled={isLoading}
					type="submit"
					className="btn btn-primary text-primary-content"
				>
					Simpan
				</button>
			</div>
		</div>
	);
};
export default FormActions;
