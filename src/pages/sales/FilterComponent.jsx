import { Icon } from '@iconify/react/dist/iconify.js';

const FilterComponent = ({ filterText, onFilter, onClear, onAdd }) => (
	<div className="flex items-center gap-2 w-full justify-between p-2 bg-base-200/75 rounded-sm my-2">
		<div className="join">
			<div className="">
				<label className="input join-item px-1 ">
					<Icon icon="material-symbols-light:search" width="24" />
					<input
						id="search"
						type="search"
						placeholder="Nama Pelanggan/Agen"
						aria-label="Search Input"
						value={filterText}
						onChange={onFilter}
					/>
				</label>
			</div>
			<button
				className="btn btn-neutral join-item px-2 "
				type="button"
				onClick={onClear}
			>
				✕
			</button>
		</div>
		<button className="btn btn-neutral px-2 rounded-sm" onClick={onAdd}>
			<Icon icon="material-symbols-light:add-rounded" width="1.5em" />
			Tambah
		</button>
	</div>
);

export default FilterComponent;
