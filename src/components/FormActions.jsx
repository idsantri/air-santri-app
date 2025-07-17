import useConfirmDialog from '../hooks/use-confirm-dialog';

const FormActions = ({ onDelete, onReset, isNew, isLoading }) => {
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
					className="btn btn-info text-info-content"
					type="button"
					onClick={onReset}
				>
					Reset
				</button>
				{!isNew && (
					<button
						disabled={isLoading}
						className="btn btn-warning text-warning-content"
						type="button"
						onClick={onDelete}
					>
						Hapus
					</button>
				)}
			</div>
			<div className="flex items-center gap-2">
				<button
					disabled={isLoading}
					className="btn btn-secondary text-secondary-content"
					type="button"
					onClick={onCancel}
				>
					Gagal
				</button>
				<button
					disabled={isLoading}
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
