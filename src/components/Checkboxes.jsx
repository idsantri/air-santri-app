import React from 'react';

function Checkboxes({ dataArray, onDataChange, label = 'Data', isLoading }) {
	return (
		<div className="form-control border-base-300/50 border-[0.5px] rounded-sm py-2 px-4">
			<div className="text-sm mb-1">{label}</div>
			<div className="flex flex-wrap gap-6">
				{isLoading ? (
					<div className="skeleton h-8 w-full rounded-md"></div>
				) : !dataArray || dataArray.length === 0 ? (
					<label className="label cursor-not-allowed">
						<input
							type="checkbox"
							className="toggle"
							disabled
							checked
						/>
						<span className="label-text">No data</span>
					</label>
				) : (
					dataArray.map((data, index) => (
						<label
							key={data.label}
							className="label cursor-pointer py-1"
						>
							<input
								type="checkbox"
								className="toggle"
								checked={data.value}
								onChange={() => onDataChange(index)}
							/>
							<span className="label-text">{data.label}</span>
						</label>
					))
				)}
			</div>
		</div>
	);
}

export default Checkboxes;
