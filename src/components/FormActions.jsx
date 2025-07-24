const FormActions = ({
	onDelete,
	onReset,
	hideDelete,
	hideReset,
	isLoading,
	hideCancel,
}) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				{!hideReset && (
					<button
						disabled={isLoading}
						className="btn btn-warning text-warning-content"
						type="button"
						onClick={onReset}
					>
						Reset
					</button>
				)}
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
						onClick={() => window.history.back()}
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
