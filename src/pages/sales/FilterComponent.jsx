import { Icon } from '@iconify/react/dist/iconify.js';
const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<div className="flex items-center gap-2 w-full justify-between p-0">
		<div className="join">
			<div>
				<label className="input join-item px-1">
					<Icon icon="material-symbols-light:search" width="24" />
					<input
						id="search"
						type="text"
						placeholder="Nama Pelanggan/Agen"
						aria-label="Search Input"
						value={filterText}
						onChange={onFilter}
					/>
				</label>
			</div>
			<button
				className="btn btn-neutral join-item px-2"
				type="button"
				onClick={onClear}
			>
				✕
			</button>
		</div>
		<button className="btn btn-neutral">Tambah</button>
	</div>
);

export default FilterComponent;
