import { useParams } from 'react-router';
import sales from '../../models/sales';
import { useEffect, useState } from 'react';
import LoadingTailwind from '../../components/LoadingTailwind';

const SaleDetail = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({});

	useEffect(() => {
		setIsLoading(true);
		sales
			.getById(id)
			.then((res) => {
				setData(res.sale);
				console.log(res.sale);
			})
			.catch((_e) => {})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	return (
		<div className="">
			<div className="text-center">
				<h2 className="text-xl font-bold">Detail Penjualan</h2>
				{isLoading ? (
					<LoadingTailwind />
				) : (
					<div className="mt-4">
						OK
						{/* <pre>{JSON.stringify(saleData, null, 2)}</pre> */}
					</div>
				)}
			</div>
		</div>
	);
};
export default SaleDetail;
