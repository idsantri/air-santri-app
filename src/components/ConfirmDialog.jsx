const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => (
	<div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900 bg-opacity-70">
		<div className="px-6 py-4 rounded-md shadow-lg bg-blue-300 w-80">
			<h2 className="mb-2 text-lg font-medium text-blue-800">{title}</h2>
			<p className="mb-4 text-sm font-light text-blue-900">{message}</p>
			<div className="flex justify-end space-x-2">
				<button
					className="w-16 font-medium border-none rounded-md shadow-sm btn btn-outline btn-sm bg-blue-200 text-blue-700 shadow-blue-600"
					onClick={onCancel}
				>
					Tidak
				</button>
				<button
					className="w-16 font-medium border-none rounded-md shadow-sm btn btn-sm bg-blue-700 text-blue-200 shadow-blue-100 hover:text-blue-950"
					onClick={onConfirm}
				>
					Ya
				</button>
			</div>
		</div>
	</div>
);

export default ConfirmDialog;
