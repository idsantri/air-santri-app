import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import products from '../../models/products';
import LoadingFixed from '../../components/LoadingFixed';
import { Link } from 'react-router';

export default function ProductIndex() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	useEffect(() => {
		setIsLoading(true);
		products
			.getAll()
			.then(({ products }) => {
				setData(products);
				// console.log(res.sales);
			})
			.catch((_e) => {})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	return (
		<>
			<header className="px-2 py-2 bg-base-300/50 flex items-center justify-between">
				<h2 className="tracking-wide text-xl">Daftar Produk</h2>
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
				{data.length > 0 ? (
					data.map((product) => (
						<li
							className="list-row gap-2 bg-gradient-to-b from-base-300 to-base-200/10 rounded-none"
							key={product.id}
						>
							<div className="list-col-grow">
								<div className="text-xl">{product.name}</div>
								<div className="font-semibold opacity-80">
									<span className="font-normal">Kulak: </span>
									{product.take_price?.toRupiah()}
									{' ⪼ '}
									<span className="font-normal">Jual: </span>
									{product.release_price?.toRupiah()}
								</div>
							</div>
							<p className="list-col-wrap text-sm italic opacity-65">
								{product.description}
							</p>
							<Link
								className="btn btn-square btn-outline"
								to={`/products/${product.id}/edit`}
								state={{ product: product }}
							>
								<Icon icon="wpf:edit" width="20" height="20" />
							</Link>
						</li>
					))
				) : (
					<li className="italic p-4 text-center">
						Tidak ada produk
						<br />
						Silakan tambahkan produk
					</li>
				)}
			</ul>
			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
		</>
	);
}
