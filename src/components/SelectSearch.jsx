import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * @typedef {Object} SelectOption
 * @property {string} value - The value of the option.
 * @property {string} label - The display label of the option.
 */

/**
 * Custom Select Component with Search and Clear Functionality
 * @param {Object} props - Component props.
 * @param {SelectOption[]} props.options - An array of objects for select options, e.g., [{ value: 'apple', label: 'Apple' }].
 * @param {string} [props.placeholder='Pilih...'] - Placeholder text for the select input.
 * @param {string} [props.value] - The currently selected value.
 * @param {function(string | null): void} [props.onChange] - Callback function when an option is selected or cleared.
 */
const SelectSearch = ({
	options,
	placeholder = 'Pilih...',
	value,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredOptions, setFilteredOptions] = useState(options);
	const [currentSelectedValue, setCurrentSelectedValue] = useState(value); // Renamed to avoid confusion with prop 'value'
	const selectRef = useRef(null);
	const inputRef = useRef(null); // Ref for the input element

	// Effect to update internal selected value when external prop changes
	useEffect(() => {
		setCurrentSelectedValue(value);
		// When value is set externally, clear search term
		if (value) {
			const selectedOption = options.find(
				(option) => option.value === value,
			);
			setSearchTerm(selectedOption ? selectedOption.label : '');
		} else {
			setSearchTerm(''); // Clear search term if value is null
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
				// If an item is selected, reset search term to its label when clicking outside
				if (currentSelectedValue) {
					const selectedOption = options.find(
						(opt) => opt.value === currentSelectedValue,
					);
					setSearchTerm(selectedOption ? selectedOption.label : '');
				} else {
					setSearchTerm(''); // Clear search term if nothing is selected
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
			setSearchTerm(option.label); // Set search term to selected label for display
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
			setIsOpen(true); // Open dropdown when typing
			setCurrentSelectedValue(null); // Clear selected value when user starts typing again
			if (onChange && currentSelectedValue) {
				// If user starts typing after selecting
				onChange(null); // Notify parent that selection is cleared
			}
		},
		[onChange, currentSelectedValue],
	);

	const handleClear = useCallback(
		(e) => {
			e.stopPropagation(); // Prevent dropdown from opening/closing
			setCurrentSelectedValue(null);
			setSearchTerm('');
			setFilteredOptions(options); // Reset filtered options to all
			setIsOpen(false); // Close dropdown on clear
			if (onChange) {
				onChange(null); // Notify parent that selection has been cleared
			}
			inputRef.current?.focus(); // Focus the input after clearing
		},
		[options, onChange],
	);

	const toggleDropdown = useCallback(() => {
		setIsOpen((prev) => !prev);
		// When opening, if something is selected, set search term to its label
		// If nothing selected, ensure search term is empty for fresh search
		if (!isOpen && currentSelectedValue) {
			const selectedOption = options.find(
				(opt) => opt.value === currentSelectedValue,
			);
			setSearchTerm(selectedOption ? selectedOption.label : '');
		} else if (!isOpen && !currentSelectedValue) {
			setSearchTerm('');
		}
		inputRef.current?.focus(); // Focus the input when dropdown is toggled
	}, [isOpen, currentSelectedValue, options]);

	const displayInputValue = currentSelectedValue
		? options.find((option) => option.value === currentSelectedValue)
				?.label || ''
		: searchTerm; // Display search term when no item is officially selected

	return (
		<div className="relative w-full" ref={selectRef}>
			<div
				className="flex items-center justify-between p-2 border border-base-300 rounded-md  cursor-pointer hover:border-primary-500 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500"
				onClick={toggleDropdown} // Use toggleDropdown for click on the main div
			>
				<input
					ref={inputRef}
					type="text"
					className="w-full bg-transparent outline-none pr-6" // Added pr-6 for clear button
					placeholder={placeholder}
					value={displayInputValue}
					onChange={handleInputChange}
					onFocus={() => setIsOpen(true)}
				/>
				{currentSelectedValue && (
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
				<svg
					className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
			</div>

			{isOpen && (
				<div className="absolute w-full mt-1 bg-white border text-black border-base-300 rounded-md shadow-lg max-h-100 overflow-y-auto z-9999">
					{filteredOptions.length > 0 ? (
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
