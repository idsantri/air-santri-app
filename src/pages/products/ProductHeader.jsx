export default function ProductHeader({ isNew }) {
	return (
		<header>
			<div className="flex items-center justify-between rounded-sm p-2 bg-accent text-accent-content mb-2">
				<h2 className="text-xl">Formulir Produk</h2>
				<p className="badge badge-info">{isNew ? 'Baru' : 'Edit'}</p>
			</div>
		</header>
	);
}
