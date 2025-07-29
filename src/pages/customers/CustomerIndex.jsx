import { useEffect, useState } from 'react';
import LoadingFixed from '../../components/LoadingFixed';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import FilterDataTable from '../../components/FilterDataTable';
import customers from '../../models/customers';

export default function CustomerIndex() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [filterText, setFilterText] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		customers
			.getAll()
			.then(({ customers }) => {
				setData(customers);
				// console.log(customers);
			})
			.catch((e) => {
				console.log('error get customer', e);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const columns = [
		{
			name: 'Kode',
			selector: (row) => row.code,
			sortable: true,
		},
		{
			name: 'Nama',
			selector: (row) => row.name,
			sortable: true,
			minWidth: '150px',
			grow: 2,
		},
		{
			name: 'Alamat',
			selector: (row) => `${row.address ?? ''} ${row.district ?? ''}`,
			sortable: true,
			minWidth: '200px',
		},
		{
			name: 'Ref',
			selector: (row) => row.referrer_name,
			sortable: true,
			minWidth: '150px',
			grow: 2,
		},
	];

	const filteredItems = data.filter((item) => {
		const searchTerm = filterText.toLowerCase();
		const code = item.code && item.code.toLowerCase().includes(searchTerm);
		const name = item.name && item.name.toLowerCase().includes(searchTerm);
		const referrer =
			item.referrer_name &&
			item.referrer_name.toLowerCase().includes(searchTerm);
		const address =
			item.address && item.address.toLowerCase().includes(searchTerm);
		const district =
			item.district && item.district.toLowerCase().includes(searchTerm);

		return code || name || referrer || address || district;
	});

	return (
		<>
			<header className="text-center">
				<h2 className="text-xl">Data Pelanggan</h2>
			</header>
			<FilterDataTable
				onFilter={(e) => setFilterText(e.target.value)}
				onAdd={() => navigate('/customers/create')}
				filterText={filterText}
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
						navigate(`/customers/${row.id}`);
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
