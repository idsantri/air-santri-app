import { Icon } from '@iconify/react/dist/iconify.js';

const FilterDataTable = ({
	filterText,
	onFilter,
	onAdd,
	placeholder = 'Cari data …',
	disableAdd = false,
}) => (
	<div className="flex items-center gap-2 w-full justify-between p-2 bg-base-200/75 rounded-sm my-2">
		<label className="input">
			<svg
				className="h-[1em] opacity-50"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<g
					strokeLinejoin="round"
					strokeLinecap="round"
					strokeWidth="2.5"
					fill="none"
					stroke="currentColor"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.3-4.3"></path>
				</g>
			</svg>
			<input
				type="search"
				id="search"
				required
				placeholder={placeholder}
				aria-label="Search Input"
				value={filterText}
				onChange={onFilter}
			/>
		</label>
		<button
			className="btn btn-neutral px-2 rounded-sm"
			onClick={onAdd}
			disabled={disableAdd}
		>
			<Icon icon="material-symbols-light:add-rounded" width="1.5em" />
			Tambah
		</button>
	</div>
);

export default FilterDataTable;
