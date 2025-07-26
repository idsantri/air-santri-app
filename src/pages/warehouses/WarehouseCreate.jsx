import WarehouseForm from './WarehouseForm';
import WarehouseHeader from './WarehouseHeader';

function WarehouseCreate() {
	return (
		<>
			<div className="card p-2 border border-base-200 rounded-sm">
				<WarehouseHeader isNew />
				<WarehouseForm />
			</div>
		</>
	);
}

export default WarehouseCreate;
