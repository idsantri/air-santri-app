import { useEffect, useState } from 'react';
import sales from '../../models/sales';
import useAuthStore from '../../store/authStore';
import LoadingFixed from '../../components/LoadingFixed';
import DataTable from 'react-data-table-component';
import formatDate from '../../utils/format-date';
import { useNavigate } from 'react-router';
import FilterDataTable from '../../components/FilterDataTable';

export default function Sales() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [filterText, setFilterText] = useState('');
	const user = useAuthStore((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		const params = user.warehouse_id
			? { warehouse_id: user.warehouse_id }
			: null;

		sales
			.getAll(params)
			.then(({ sales }) => {
				setData(sales);
				// console.log(sales[0]);
			})
			.catch((e) => {
				console.log('error get sales', e);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [user]);

	const columns = [
		{
			name: 'Tanggal',
			selector: (row) => row.sale_date,
			sortable: true,
			format: (row) => formatDate(row.sale_date, 'yyyy-MM-dd'),
		},
		{
			name: 'Pelanggan',
			selector: (row) => row.customer_name,
			sortable: true,
			// style: {
			// 	flex: 3,
			// },
			grow: 3,
		},
		// {
		// 	name: 'Agen',
		// 	selector: (row) => row.warehouse_name,
		// 	sortable: true,
		// },
		{
			name: 'Status',
			selector: (row) => row.status,
			sortable: true,
		},
		// {
		// 	name: 'Pembayaran',
		// 	selector: (row) => {
		// 		if (row.total_payment >= row.total_amount) {
		// 			return 'Lunas';
		// 		} else if (row.total_payment > 0) {
		// 			return 'Sebagian';
		// 		} else {
		// 			return 'Belum Dibayar';
		// 		}
		// 	},
		// 	sortable: true,
		// },
		{
			name: 'Tagihan',
			selector: (row) => row?.total_gross?.toRupiah(),
			sortable: true,
			right: true,
		},
		{
			name: 'Sisa',
			selector: (row) =>
				(
					(row?.total_gross || 0) - (row?.total_payment || 0)
				)?.toRupiah(),
			sortable: true,
			right: true,
		},
	];

	const filteredItems = data.filter((item) => {
		const searchTerm = filterText.toLowerCase();
		const customerMatch =
			item.customer_name &&
			item.customer_name.toLowerCase().includes(searchTerm);
		const warehouseMatch =
			item.warehouse_name &&
			item.warehouse_name.toLowerCase().includes(searchTerm);

		return customerMatch || warehouseMatch;
	});

	return (
		<>
			<header className="text-center">
				<h2 className="text-xl font-semibold">
					Data Transaksi (Penjualan)
				</h2>
				{user.warehouse_id ? (
					<>
						<p>{user.warehouse_name}</p>
						<p className="text-sm">{user.warehouse_address}</p>
					</>
				) : (
					<>
						<p>Semua Gudang</p>
					</>
				)}
			</header>
			<FilterDataTable
				onFilter={(e) => setFilterText(e.target.value)}
				onAdd={() => navigate('/sales/create-transaction')}
				// onAdd={() => navigate('/sales/create')}
				filterText={filterText}
				placeholder="Cari pelanggan atau agen"
				disableAdd={!user?.warehouse_id}
			/>
			{isLoading ? (
				<LoadingFixed />
			) : (
				<DataTable
					noHeader
					columns={columns}
					data={filteredItems}
					pagination
					persistTableHead
					onRowClicked={(row) => {
						navigate(`/sales/${row.id}`);
					}}
					striped
					responsive
					highlightOnHover
					pointerOnHover
				/>
			)}
		</>
	);
}
