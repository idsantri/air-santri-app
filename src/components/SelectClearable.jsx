import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const SelectClearable = ({
	label,
	options,
	value,
	onChange,
	placeholder = 'Pilih data …',
	disabled = false, // 🔹 Tambahkan prop disabled
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef(null);
	const selected = options.find((opt) => opt === value);

	// 🔹 Tutup saat klik di luar komponen
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="form-control w-full relative" ref={wrapperRef}>
			<label className="floating-label">
				<span className="label-text">{label}</span>
			</label>

			<div
				tabIndex={0}
				className={`input input-bordered w-full flex items-center justify-between cursor-pointer ${
					disabled ? 'opacity-50 pointer-events-none' : ''
				}`}
				onClick={() => !disabled && setIsOpen((prev) => !prev)}
			>
				<span>{selected || placeholder}</span>

				{value && !disabled && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							onChange('');
							setIsOpen(false);
						}}
						className="text-gray-400 hover:text-red-500"
					>
						<Icon icon="ic:outline-clear" width="18" height="18" />
					</button>
				)}
			</div>

			{isOpen && !disabled && (
				<ul className="menu bg-base-100 w-full rounded-box mt-1 absolute z-10 shadow max-h-60 overflow-auto">
					{options.map((opt) => (
						<li key={opt}>
							<a
								onClick={() => {
									onChange(opt);
									setIsOpen(false);
								}}
							>
								{opt}
							</a>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SelectClearable;
