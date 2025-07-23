import { useEffect, useState } from 'react';
import useAuthStore from '../../store/authStore';
import warehouses from '../../models/warehouses';
import LoadingFixed from '../../components/LoadingFixed';
import { Link } from 'react-router';
import { Icon } from '@iconify/react/dist/iconify.js';

function StockIndex() {
	const { user } = useAuthStore().auth;
	const [stocks, setStocks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		warehouses
			.getStocks(user.warehouse_id)
			.then(({ stocks }) => {
				setStocks(stocks);
				console.log(stocks);
			})
			.catch((_e) => {})
			.finally(() => {
				setIsLoading(false);
			});
	}, [user]);

	return (
		<>
			<header className="px-2 py-2 bg-base-300/50 flex items-center justify-between">
				<div>
					<h2 className="tracking-wide text-xl">Data Stok</h2>
					<p>{user.warehouse_name}</p>
					<p className="text-sm">{user.warehouse_address}</p>
				</div>
				<Link
					className="btn btn-accent rounded-sm"
					to={'/products/create'}
				>
					<Icon
						icon="material-symbols-light:add-rounded"
						width="1.5em"
					/>
					Tambah
				</Link>
			</header>
			{isLoading && <LoadingFixed />}
			<ul className="list bg-base-200/50 shadow-sm rounded-md mt-2">
				{stocks.length > 0 ? (
					stocks.map((stock) => (
						<li
							className="list-row gap-2 bg-gradient-to-b from-base-300 to-base-200/10 rounded-none"
							key={stock.id}
						>
							<div className="text-4xl font-thin opacity-70 tabular-nums w-[60px] text-right">
								{stock.stock}
							</div>
							<div className="list-col-grow">
								<div className="text-xl">
									{stock.product_name}
								</div>
								<div className="font-semibold opacity-80">
									<span className="font-normal">Kulak: </span>
									{stock.product_take_price?.toRupiah()}
									{' ⪼ '}
									<span className="font-normal">Jual: </span>
									{stock.product_release_price?.toRupiah()}
								</div>
							</div>
							<p className="list-col-wrap text-sm italic opacity-65">
								{stock.product_description}
							</p>
							<Link
								className="btn btn-square btn-outline"
								to={`/products/${stock.id}/edit`}
								state={{ product: stock }}
							>
								<Icon icon="wpf:edit" width="20" height="20" />
							</Link>
						</li>
					))
				) : (
					<li className="italic p-4 text-center">
						Tidak ada stok
						<br />
						Silakan tambahkan stok
					</li>
				)}
			</ul>
		</>
	);
}

export default StockIndex;
