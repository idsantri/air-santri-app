import { useEffect, useMemo, useState } from 'react';
import sales from '../../models/sales';
import useAuthStore from '../../store/authStore';
import LoadingTailwind from '../../components/LoadingTailwind';
import DataTable from 'react-data-table-component';
import formatDate from '../../utils/format-date';
import FilterComponent from './FilterComponent';
import { useNavigate } from 'react-router';

export default function Sales() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const { user } = useAuthStore().auth;
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		sales
			.getAll({ warehouse_id: user.warehouse_id })
			.then((res) => {
				setData(res.sales);
				// console.log(res.sales);
			})
			.catch((_e) => {})
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
		},
		{
			name: 'Agen',
			selector: (row) => row.warehouse_name,
			sortable: true,
		},
		{
			name: 'Status',
			selector: (row) => row.status,
			sortable: true,
		},
		{
			name: 'Pembayaran',
			selector: (row) => {
				if (row.total_payment >= row.total_amount) {
					return 'Lunas';
				} else if (row.total_payment > 0) {
					return 'Sebagian';
				} else {
					return 'Belum Dibayar';
				}
			},
			sortable: true,
		},
	];

	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

	// Filter berdasarkan customer_name dan/atau warehouse_name
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

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		return (
			<FilterComponent
				onFilter={(e) => setFilterText(e.target.value)}
				onClear={handleClear}
				filterText={filterText}
			/>
		);
	}, [filterText, resetPaginationToggle]);

	return (
		<div className="">
			<div className="text-center">
				<h2 className="text-2xl font-bold">Data Penjualan</h2>
				<p>{user.warehouse_name}</p>
				<p className="text-sm">{user.warehouse_address}</p>
				{isLoading ? (
					<LoadingTailwind />
				) : (
					<div className="mt-4">
						<DataTable
							noHeader
							columns={columns}
							data={filteredItems}
							pagination
							paginationResetDefaultPage={resetPaginationToggle}
							subHeader
							subHeaderComponent={subHeaderComponentMemo}
							persistTableHead
							onRowClicked={(row) => {
								navigate(`/sales/${row.id}`);
							}}
							striped
							responsive
							highlightOnHover
							pointerOnHover
							subHeaderAlign="center"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
