import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import sales from '../../models/sales';

function SaleEdit() {
	const { id } = useParams(); // Jika Anda masih membutuhkan ID dari URL
	const location = useLocation();
	const [sale, setSale] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (location.state) {
			// Data ada dari navigasi
			setSale(location.state.saleData);
			setIsLoading(false);
			console.log('Data loaded from navigation state!');
		} else {
			console.log('No data in state, fetching from server...');
			setIsLoading(true);
			sales
				.getById(id)
				.then((res) => {
					setSale(res.sale);
				})
				.then((e) => console.log(e))
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [location.state, id]); // Tambahkan location.state sebagai dependency

	if (isLoading) {
		return <div>Loading data...</div>;
	}

	return (
		<div>
			<h1>Edit Sale ID: {id}</h1>
			{sale && (
				<div>
					<h2>Sale Data:</h2>
					<pre>{JSON.stringify(sale, null, 2)}</pre>
				</div>
			)}

			{/* Form edit Anda di sini */}
		</div>
	);
}

export default SaleEdit;
