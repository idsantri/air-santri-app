const ConfirmDialog = ({
	title = 'Konfirmasi!',
	message,
	onConfirm,
	onCancel,
}) => (
	<div className="fixed inset-0 z-1000 flex items-center justify-center bg-primary-content/80">
		<div className="rounded-md shadow-lg bg-info w-80 overflow-hidden">
			<div className="px-2 py-1 bg-warning text-warning-content">
				<h3 className="text-lg font-medium">{title}</h3>
			</div>
			<div className="px-2 py-2 bg-warning/75 border-t border-warning-content/10">
				<p className="text-sm font-light text-warning-content">
					{message}
				</p>
				<div className="flex justify-end space-x-3 mt-2">
					<button
						className="w-16 font-medium border-none rounded-md shadow-sm btn btn-outline btn-sm 
						bg-warning text-warning-content shadow-warning-content 
						hover:bg-info hover:text-info-content hover:shadow-info-content"
						onClick={onCancel}
					>
						Tidak
					</button>
					<button
						className="w-16 font-medium border-none rounded-md shadow-sm btn btn-outline btn-sm 
						bg-neutral text-neutral-content shadow-neutral-content 
						hover:bg-success hover:text-success-content hover:shadow-success-content"
						onClick={onConfirm}
					>
						Ya
					</button>
				</div>
			</div>
		</div>
	</div>
);

export default ConfirmDialog;
