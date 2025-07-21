import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * @typedef {Object} SelectOption
 * @property {string} value - The value of the option.
 * @property {string} label - The display label of the option.
 * @property {string} [description] - Optional description for the option.
 */

/**
 * Custom Select Component with Search, Clear Functionality, Floating Label, and Loading Indicator
 * @param {Object} props - Component props.
 * @param {SelectOption[]} props.options - An array of objects for select options, e.g., [{ value: 'apple', label: 'Apple' }].
 * @param {string} [props.label='Select'] - Label text for the floating label.
 * @param {string} [props.placeholder='Pilih...'] - Placeholder text for the select input.
 * @param {string} [props.value] - The currently selected value.
 * @param {function(string | null): void} [props.onChange] - Callback function when an option is selected or cleared.
 * @param {boolean} [props.isLoading=false] - Whether the data is currently loading.
 */
const SelectSearch = ({
	options,
	label = 'Pilih...', // Added label prop
	placeholder = 'Cari...',
	value,
	onChange,
	isLoading = false, // New prop for loading state
	disabled = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredOptions, setFilteredOptions] = useState(options);
	const [currentSelectedValue, setCurrentSelectedValue] = useState(value);
	const selectRef = useRef(null);
	const inputRef = useRef(null);

	// Effect to update internal selected value when external prop changes
	useEffect(() => {
		setCurrentSelectedValue(value);
		if (value) {
			const selectedOption = options.find(
				(option) => option.value === value,
			);
			setSearchTerm(selectedOption ? selectedOption.label : '');
		} else {
			setSearchTerm('');
		}
	}, [value, options]);

	// Effect to filter options based on search term
	useEffect(() => {
		if (searchTerm.length >= 3) {
			const lowercasedSearchTerm = searchTerm.toLowerCase();
			const filtered = options.filter((option) =>
				option.label.toLowerCase().includes(lowercasedSearchTerm),
			);
			setFilteredOptions(filtered);
		} else {
			setFilteredOptions(options); // Show all options if search term is less than 3 chars
		}
	}, [searchTerm, options]);

	// Effect to close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target)
			) {
				setIsOpen(false);
				if (currentSelectedValue) {
					const selectedOption = options.find(
						(opt) => opt.value === currentSelectedValue,
					);
					setSearchTerm(selectedOption ? selectedOption.label : '');
				} else {
					setSearchTerm('');
				}
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [currentSelectedValue, options]);

	const handleSelect = useCallback(
		(option) => {
			setCurrentSelectedValue(option.value);
			setSearchTerm(option.label);
			setIsOpen(false);
			if (onChange) {
				onChange(option.value);
			}
		},
		[onChange],
	);

	const handleInputChange = useCallback(
		(e) => {
			setSearchTerm(e.target.value);
			setIsOpen(true);
			setCurrentSelectedValue(null);
			if (onChange && currentSelectedValue) {
				onChange(null);
			}
		},
		[onChange, currentSelectedValue],
	);

	const handleClear = useCallback(
		(e) => {
			e.stopPropagation();
			setCurrentSelectedValue(null);
			setSearchTerm('');
			setFilteredOptions(options);
			setIsOpen(false);
			if (onChange) {
				onChange(null);
			}
			inputRef.current?.focus();
		},
		[options, onChange],
	);

	const toggleDropdown = useCallback(() => {
		setIsOpen((prev) => !prev);
		if (!isOpen && currentSelectedValue) {
			const selectedOption = options.find(
				(opt) => opt.value === currentSelectedValue,
			);
			setSearchTerm(selectedOption ? selectedOption.label : '');
		} else if (!isOpen && !currentSelectedValue) {
			setSearchTerm('');
		}
		inputRef.current?.focus();
	}, [isOpen, currentSelectedValue, options]);

	const displayInputValue = currentSelectedValue
		? options.find((option) => option.value === currentSelectedValue)
				?.label || ''
		: searchTerm;

	const isInputActive = !!displayInputValue || isOpen;

	return (
		<div className="relative w-full" ref={selectRef}>
			<label
				className={`floating-label ${isInputActive ? 'active' : ''}`}
				onClick={toggleDropdown}
			>
				<span className="label-text">{label}</span>
				<div className="flex items-center w-full relative">
					<input
						ref={inputRef}
						type="text"
						className="input w-full pr-14"
						placeholder={placeholder}
						value={displayInputValue}
						onChange={handleInputChange}
						onFocus={() => setIsOpen(true)}
						disabled={isLoading || disabled} // Disable input when loading
					/>
					{isLoading && (
						<span className="loading loading-spinner loading-sm absolute right-2"></span> // DaisyUI spinner
					)}
					{!isLoading &&
						currentSelectedValue && ( // Show clear button only if not loading
							<button
								type="button"
								onClick={handleClear}
								className="absolute right-8 text-neutral-500 hover:text-gray-700 focus:outline-none"
								aria-label="Clear selection"
							>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									></path>
								</svg>
							</button>
						)}
					{!isLoading && ( // Show arrow icon only if not loading
						<svg
							className={`w-4 h-4 text-neutral-500 transition-transform duration-200 absolute right-2 ${isOpen ? 'rotate-180' : ''}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					)}
				</div>
			</label>

			{isOpen && (
				<div className="absolute w-full mt-1 bg-white border text-black border-base-300 rounded-md shadow-lg max-h-100 overflow-y-auto z-9999">
					{isLoading ? (
						// Skeleton or spinner for loading options
						<div className="p-2">
							<span className="loading loading-spinner text-primary"></span>{' '}
							Loading options...
							{/* Or a skeleton loader for better UX */}
							{/* <div className="skeleton h-4 w-full mb-2"></div>
                            <div className="skeleton h-4 w-full mb-2"></div>
                            <div className="skeleton h-4 w-full"></div> */}
						</div>
					) : filteredOptions.length > 0 ? (
						filteredOptions.map((option) => (
							<div
								key={option.value}
								className={`p-2 cursor-pointer hover:bg-blue-100 ${option.value === currentSelectedValue ? 'bg-blue-50 text-blue-700' : ''}`}
								onClick={() => handleSelect(option)}
							>
								{option.label}
								{option?.description && (
									<>
										<p className="text-xs text-gray-500">
											{option.description}
										</p>
									</>
								)}
							</div>
						))
					) : (
						<div className="p-2 text-gray-500">Tidak ada data</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SelectSearch;
