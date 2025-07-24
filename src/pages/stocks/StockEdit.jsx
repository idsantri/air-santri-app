import { useEffect, useState } from 'react';
import StockForm from './StockForm';
import { useLocation, useNavigate, useParams } from 'react-router';
import { notifyError } from '../../components/Notify';

export default function StockEdit() {
	const { id } = useParams();
	const location = useLocation();
	const [stock, setStock] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		// console.log('🚀 ~ useEffect ~ location.state:', location.state.stock);
		if (
			location.state &&
			location.state.stock &&
			location?.state?.stock?.id == id
		) {
			setStock(location.state.stock);
			// setIsLoading(false);
		} else {
			notifyError({ message: 'Data stock tidak ditemukan.' });
			navigate('/stocks'); // Redirect jika tidak ada data stock
		}
	}, [location.state, id, navigate]); // Tambahkan location.state sebagai dependency
	// console.log(stock);
	return (
		<div>
			<div>Edit stock</div>
			<hr />
			<StockForm inputData={stock} />
		</div>
	);
}
